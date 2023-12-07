import vscode from 'vscode';

export async function activate(ctx: vscode.ExtensionContext): Promise<void> {
  if (process.platform === 'darwin') {
    process.env.APPDATA = process.env.APPDATA || `/Users/${process.env.USER}/.config`;
    process.env.PROGRAMDATA = process.env.PROGRAMDATA || '/Users/Shared/';
    process.env.PROGRAMFILES = process.env.PROGRAMFILES || `/Users/${process.env.USER}/Applications`;
  }

  const imported = await import('./extension.workspace.mjs');
  await imported.StitchWorkspace.activate(ctx);
}
