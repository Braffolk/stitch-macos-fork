import { Pathy } from '@bscotch/pathy';
import { arrayWrapped, formatTimestamp } from '@bscotch/utility/browser';
import { spawn } from 'child_process';
import type { GameMakerLogOptions } from './GameMakerLauncher.types.js';
import type {
  GameMakerCliCommand,
  GameMakerCliWorker,
} from './GameMakerRuntime.cliTypes.js';
import type { GameMakerRuntime } from './GameMakerRuntime.js';
import {
  GameMakerBuildOptions,
  GameMakerExecuteOptions,
  GameMakerExecutionResults,
  StitchSupportedBuilder,
} from './GameMakerRuntime.types.js';
import {
  artifactExtensionForPlatform, deriveOs,
  deriveTargetPlatform,
  projectLogDirectory,
} from './utility.js';
import * as console from "console";

export async function executeGameMakerRuntimeInstallCommand(
  runtime: GameMakerRuntime,
  newRuntime: { version: string; feedUrl: string },
) {
  return await executeGameMakerCommand(
    runtime,
    'runtime',
    ['Install', newRuntime.version],
    {
      user: (await runtime.activeUserDirectory()).absolute,
      runtimePath: runtime.directory.up().absolute,
      runtimeUrl: newRuntime.feedUrl,
      verbose: true,
    },
  );
}

export async function computeOptions(
  runtime: GameMakerRuntime,
  options: GameMakerBuildOptions & { compile?: boolean },
) {
  const target = options?.targetPlatform || deriveTargetPlatform();
  const projectPath = new Pathy(options.project);
  const projectDir = projectPath.up();
  const outputDir = new Pathy(options?.outDir || projectDir);
  const tempDir = new Pathy(projectDir).join('tmp');
  const empath = (p: Pathy | string) => `"${p}"`;
  return {
    project: empath(projectPath),
    user: empath(await runtime.activeUserDirectory()),
    runtimePath: empath(runtime.directory),
    runtime: options?.yyc ? 'YYC' : 'VM',
    config: options?.config,
    verbose: !options?.quiet,
    ignorecache: !!options?.noCache,
    cache: empath(tempDir.join('igor/cache')),
    temp: empath(tempDir.join('igor/temp')),
    // For some reason the filename has to be there
    // but only the directory is used...
    of: empath(tempDir.join(`igor/out/${projectPath.name}.win`)),
    tf: empath(
      outputDir.join(
        `${projectPath.name}.${artifactExtensionForPlatform(target)}`,
      ),
    ),
  };
}

export async function computeGameMakerCleanOptions(
  runtime: GameMakerRuntime,
  options: GameMakerBuildOptions,
): Promise<{
  target: StitchSupportedBuilder;
  command: 'Clean';
  options: GameMakerExecuteOptions;
}> {
  const target = options?.targetPlatform || deriveTargetPlatform();
  const buildOptions = await computeOptions(runtime, options);
  return {
    target,
    command: 'Clean',
    options: buildOptions,
  };
}

export async function computeGameMakerBuildOptions(
  runtime: GameMakerRuntime,
  options: GameMakerBuildOptions & { compile?: boolean },
): Promise<{
  target: StitchSupportedBuilder;
  command: 'Run' | 'PackageZip' | 'Package';
  options: GameMakerExecuteOptions;
}> {
  const target = options?.targetPlatform || deriveTargetPlatform();
  const command = options?.compile
    ? target === 'windows'
      ? 'PackageZip'
      : 'Package'
    : 'Run';
  const buildOptions = await computeOptions(runtime, options);
  return {
    target,
    command,
    options: buildOptions,
  };
}

// If I don't specify modules, I'll just get all of those I'm entitled to.
// The /rp points to the folder CONTAINING the runtime FOLDERS
// The /ru feed is required
// The other arguments are positional

export async function executeGameMakerBuildCommand(
  runtime: GameMakerRuntime,
  options: GameMakerBuildOptions & { compile?: boolean },
) {
  const {
    target,
    command,
    options: buildOptions,
  } = await computeGameMakerBuildOptions(runtime, options);

  const results = await executeGameMakerCommand(
    runtime,
    target,
    command,
    buildOptions,
    options,
  );
  return results;
}

export async function executeGameMakerCleanCommand(
  runtime: GameMakerRuntime,
  options: GameMakerBuildOptions & { compile?: boolean },
) {
  const {
    target,
    command,
    options: buildOptions,
  } = await computeGameMakerCleanOptions(runtime, options);

  const results = await executeGameMakerCommand(
    runtime,
    target,
    command,
    buildOptions,
    options,
  );
  return results;
}

export async function stringifyGameMakerBuildCommand(
  runtime: GameMakerRuntime,
  options: GameMakerBuildOptions & { compile?: boolean },
) {
  const { cmd, args } = await computeGameMakerBuildCommand(runtime, options);
  const escapedCmd = cmd.replace(/[/\\]/g, '/').replace(/ /g, '\\ ');
  return `${escapedCmd} ${args.join(' ')}`;
}

export async function stringifyGameMakerCleanCommand(
  runtime: GameMakerRuntime,
  options: GameMakerBuildOptions,
) {
  const { cmd, args } = await computeGameMakerCleanCommand(runtime, options);
  const escapedCmd = cmd.replace(/[/\\]/g, '/').replace(/ /g, '\\ ');
  return `${escapedCmd} ${args.join(' ')}`;
}

export async function computeGameMakerCleanCommand(
  runtime: GameMakerRuntime,
  options: GameMakerBuildOptions & { compile?: boolean },
) {
  const {
    target,
    command,
    options: buildOptions,
  } = await computeGameMakerCleanOptions(runtime, options);

  return computeGameMakerCommand(runtime, target, command, buildOptions);
}

export async function computeGameMakerBuildCommand(
  runtime: GameMakerRuntime,
  options: GameMakerBuildOptions & { compile?: boolean },
) {
  const {
    target,
    command,
    options: buildOptions,
  } = await computeGameMakerBuildOptions(runtime, options);

  return computeGameMakerCommand(runtime, target, command, buildOptions);
}

export function computeGameMakerCommand<W extends GameMakerCliWorker>(
  runtime: GameMakerRuntime,
  worker: W,
  command:
    | GameMakerCliCommand<W>
    | [command: GameMakerCliCommand<W>, ...positionalArgs: string[]],
  executionOptions: GameMakerExecuteOptions,
) {
  let args = Object.entries(executionOptions)
    .map((option) => {
      const [key, value] = option;
      if (typeof value === 'undefined') {
        return;
      }
      const arg = `--${key}`;
      if (value === false) {
        return;
      }
      if (value === true) {
        return arg;
      }
      return arg + `=${value}`;
    })
    .filter((x) => x) as string[];
  let cmd = runtime.executablePath.absolute;
  if (cmd.endsWith('.exe') && process.platform == "darwin") {
    // Older mono version.
    cmd = `"/Library/Frameworks/Mono.framework/Versions/Current/Commands/mono" "${cmd}"`;
  }
  args = [...args, '--', worker, ...arrayWrapped(command)];
  return {
    cmd,
    args,
  };
}

export async function executeGameMakerCommand<W extends GameMakerCliWorker>(
  runtime: GameMakerRuntime,
  worker: W,
  command:
    | GameMakerCliCommand<W>
    | [command: GameMakerCliCommand<W>, ...positionalArgs: string[]],
  executionOptions: GameMakerExecuteOptions,
  otherOptions?: GameMakerLogOptions,
) {
  const childEnv = { ...process.env };
  if (childEnv.PATH && deriveOs() === 'win') {
    //This is because node's the ENV contain the PATH variable that conflicts with MSBuild
    //See https://github.com/dotnet/msbuild/issues/5726
    delete childEnv.PATH;
  }
  const { cmd, args } = computeGameMakerCommand(
    runtime,
    worker,
    command,
    executionOptions,
  );
  console.log('🚀 Running GameMaker CLI command:');
  console.log(cmd, ...args);
  const child = spawn(cmd, args, {
    env: childEnv,
    stdio: 'pipe',
    // Shell is required on mac, as quotes aren't removed otherwise from args
    shell: deriveOs() !== 'win' ? true : undefined
  });

  // Set up writeable file streams
  const timestamp = formatTimestamp(new Date(), {
    secondsPrecision: 0,
    timeSeparator: '',
  });

  const logDir = await projectLogDirectory(
    executionOptions.project,
    otherOptions,
  );
  const logFilePathy = (fileName: string) => {
    const logFileName = `${
      otherOptions?.excludeLogFileTimestamps ? '' : `${timestamp}.`
    }${fileName}.txt`;
    const logFilePath = new Pathy(logDir.join(logFileName));
    return logFilePath;
  };

  const results: Partial<GameMakerExecutionResults> = {};
  for (const pipe of ['stdout', 'stderr'] as const) {
    // Create a writeable filestream
    child[pipe].on('data', (data) => {
      const dataString = data.toString();
      results[pipe] += dataString;
      console[pipe === 'stderr' ? 'error' : 'log'](dataString);
    });
  }

  return new Promise((resolve: (s: GameMakerExecutionResults) => void) => {
    child.on('exit', async () => {
      // The text "Igor complete." appears
      // after the compile logs (if compile
      // was successful) AND after the run
      // (if the run exited normally).
      const successMessage = 'Igor complete.';
      const logParts = results.stdout!.split(successMessage);
      results.compileSucceeded = logParts.length > 1;

      const wasRunnable = command === 'Run' && results.compileSucceeded;
      const containedTwoIgorCompletes = logParts.length === 3;
      results.runnerSucceeded = wasRunnable
        ? containedTwoIgorCompletes
        : undefined;

      // Add compiler & runner logs
      for (const [index, source] of (
        ['compiler', 'runner'] as const
      ).entries()) {
        let content = logParts[index];
        if (!content) {
          continue;
        }
        const needsSuccessMessage =
          (index === 0 && results.compileSucceeded) ||
          (index === 1 && results.runnerSucceeded);
        if (needsSuccessMessage) {
          content += successMessage;
        }
        const logName = `${source}Logs` as const;
        results[logName] = content;
        const logFileKey = `${source}LogsPath` as const;
        const logFilePath = logFilePathy(source);
        await logFilePath.write(content);
        results[logFileKey] = logFilePath.absolute;
      }

      resolve(results as GameMakerExecutionResults);
    });
  });
}
