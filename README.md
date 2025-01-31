<p align="center">
  <img src="https://img.bscotch.net/fit-in/256x256/logos/stitch.png" alt="Stitch (GameMaker Pipeline Development Kit) Logo"/>
</p>


# MACOS NOTES:

This fork attempts to get the Stitch extension for VSCode to work on MacOS without any issues.

For testing purposes, the following summary file is used:
https://stitch-mac.s3.eu-central-1.amazonaws.com/releases-summary-mac.json

process.env for MacOS:
- PROGRAMFILES: /Users/account-here/Applications
- PROGRAMDATA: /Users/Shared/
- APPDATA: /Users/account-here/.config

## Progress

<img width="460" alt="image" src="https://github.com/Braffolk/stitch-macos-fork/assets/7544836/9fbfc34b-011a-4b68-b235-645418c2d2fa">


VSCode extension mostly works now. Managing runtimes and IDEs and
running projects also works. Downloading new IDE's is a bit flaky,
although all tests pass.

#### Releases package
Supports MacOS and Linux.

- Downloading and reading release feeds is now OS specific. The package does not know the OS, the OS is passed into params
- Added tests for downloading Linux and MacOS releases
- releases-summary.json is replaced with 3 files: ...-win.json, ...-mac.json, ...-linux.json

### Launcher package

Supports MacOS.

The following features work on a Mac with MacOS IDEs/runtimes:

- Can download Runtimes and IDE files on MacOS
- Can properly handle reading and listing Runtimes and IDEs.
- Can install new IDE versions.
- Properly caches downloaded IDE versions
- Can run projects with a runtime (Igor commands work)
- Can open projects with a given runtime
- Mono runtimes are also supported now. Meaning older runtimes work!

Issues:

- There are no separate release notes for MacOS. The RSS feeds link to the Windows release notes.
    This causes an issue when there is an IDE version that is only available for MacOS. In such
    a case, there will be a link to the release notes, but requesting it will give AccessDenied.
- The code is a bit messy. Different platforms logic is inserted into many random places. This probably needs some refactoring

### Core package

Supports MacOS.

- GameMakerEngine does not fallback to windows. It attempts to derive the used platform

### Pixel Checksum

Supports MacOS

### Spritely package

Supports MacOS

- All tests run when the canvas library is used

### VSCode package

Works on MacOS

- Added clearer error messages for IDE install fails
- Added a delay to sending messages to terminal, otherwise on unix based systems the messages can send twice


## Potential problems
Since I don't work with Node daily, I might have missed some things. Here are some potential problems:

## CLI

CLI differs between runtime versions. Older runtimes rely on mono and hence have a different syntax.

Mono install new runtime:
```
"/Library/Frameworks/Mono.framework/Versions/Current/Commands/mono" /Users/Shared/GameMakerStudio2-Beta/Cache/runtimes/runtime-2022.300.0.478/bin/Igor.exe -user=/Users/.../.config/GameMakerStudio2-Beta/... --runtimePath=/Users/Shared/GameMakerStudio2-Beta/Cache/runtimes --runtimeUrl=https://gms.yoyogames.com/Zeus-Runtime-NuBeta.rss --verbose -- runtime Install 2022.600.0.121
```

Mono run project (from current directory):
"/Library/Frameworks/Mono.framework/Versions/Current/Commands/mono"  /Users/Shared/GameMakerStudio2-Beta/Cache/runtimes/runtime-2022.300.0.478/bin/Igor.exe -j=8 -options="/tmp/GameMakerStudio2-Beta/GMS2TEMP/build.bff" -v -- Mac Run


Igor install new runtime:




# Stitch Monorepo

[Butterscotch Shenanigans](https://www.bscotch.net) ("Bscotch") develops and maintains a collection of tools for management of [GameMaker](https://gamemaker.io) projects. These tools are collected under the umbrella trademark "Stitch".

This monorepo includes the code for many of the Stitch projects.

>💡 Bscotch only develops features and fixes bugs that impact our studio directly. If you need other features or fixes, feel free to fork this project to add them yourself. You may submit pull requests with your changes, but we make no promises that we will merge them.

_Butterscotch Shenanigans&reg; and Stitch&trade; are not affiliated with GameMaker&reg;._

## Stitch Projects

Some of the projects listed here are available as compiled packages via [npm](https://npmjs.com) or other 3rd party repositories. Others are only used locally.

- [**Stitch for VSCode**](packages/vscode): A [Visual Studio Code](https://code.visualstudio.com/) extension providing code editing features for GameMaker project files. Available as `bscotch.bscotch-stitch-vscode` [via the Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=bscotch.bscotch-stitch-vscode).
- [**Stitch Core**](packages/core): The core SDK for managing and manipulating GameMaker projects. It includes a programmatic API and a CLI. Available as `@bscotch/stitch` [via npm](https://www.npmjs.com/package/@bscotch/stitch).
- [**Stitch YY**](packages/yy): Utilities for reading, validating, and writing `.yy` and `.yyp` files. Available as `@bscotch/yy` [via npm](https://www.npmjs.com/package/@bscotch/yy).
- [**Stitch Launcher**](packages/launcher): Utilities for automatically installing the GameMaker IDE by version, and opening GameMaker projects with specific IDE versions.
- [**Spritely**](packages/spritely): Utilities for batch-preparation of source images for import as GameMaker sprites. It includes a programmatic API and a CLI. Available as `@bscotch/spritely` [via npm](https://www.npmjs.com/package/@bscotch/spritely).
- [**GameMaker Merged Releases**](packages/releases): Utilities for merging the various GameMaker IDE and Runtime release notes into a single merged listing. Available as `@bscotch/gamemaker-releases` [via npm](https://www.npmjs.com/package/@bscotch/gamemaker-releases). Merged feeds are regularly published to [this repo's releases](https://github.com/bscotch/stitch/releases/latest/download/releases-summary.json).

## Development

### Setup

1. Install [pnpm](https://pnpm.io/installation)
  - If you already have corepack available but do not have pnpm, you can run `npm run setup:pnpm` in this directory to install it.
2. Run `pnpm install` in this directory to install all dependencies.
  - You can use [pnpm filters](https://pnpm.io/filtering) to only install the dependencies for a specific package.
3. Run `pnpm build:all` to build all packages.
  - This project uses [turborepo](https://turbo.build/). You can use [its filters](https://turbo.build/repo/docs/reference/command-line-reference/run#--filter) to build only specific packages.
