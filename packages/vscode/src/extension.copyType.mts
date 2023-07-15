import vscode from 'vscode';
import type { StitchProvider } from './extension.provider.mjs';
import { copyToClipboard } from './lib.mjs';

export function createCopyAsTypeCallback(provider: StitchProvider) {
  return (file: vscode.Uri) => {
    const type = uriToType(provider, file);
    if (type) {
      copyToClipboard(type);
    }
  };
}

export function createCopyAsJsdocSelfCallback(provider: StitchProvider) {
  return (file: vscode.Uri) => {
    const type = uriToType(provider, file);
    if (type && type.match(/^(Struct|Id.Instance|Asset.GMObject)/)) {
      copyToClipboard(`/// @self ${type}`);
    } else if (type) {
      // Notify the user that this type is not a self-type
      vscode.window.showInformationMessage(
        `Type "${type}" cannot be used as a context type.`,
      );
    }
  };
}

export function createCopyAsJsdocTypeCallback(provider: StitchProvider) {
  return (file: vscode.Uri) => {
    const type = uriToType(provider, file);
    if (type) {
      copyToClipboard(`/// @type {${type}}`);
    }
  };
}

function uriToType(provider: StitchProvider, file: vscode.Uri) {
  const position = vscode.window.activeTextEditor?.selection.active;
  if (!position) {
    return;
  }
  const ref = provider.getReference(file, position);
  if (!ref) {
    return;
  }
  const isConstructor = ref.item.type.constructs.length > 0;
  if (isConstructor) {
    return `Struct.${ref.item.name}`;
  }
  return ref.item.type.toFeatherString();
}
