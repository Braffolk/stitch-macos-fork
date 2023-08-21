import vscode from 'vscode';
import { assertUserClaim } from './assert.mjs';
import type { StitchWorkspace } from './extension.workspace.mjs';
import { rangeFrom } from './lib.mjs';

export class StitchRenameProvider implements vscode.RenameProvider {
  constructor(readonly provider: StitchWorkspace) {}

  /** Get the reference at a given position, else throw */
  protected assertRenameableReference(
    document: vscode.TextDocument,
    position: vscode.Position,
  ) {
    const ref = this.provider.getReference(document, position);
    assertUserClaim(ref, 'Not a symbol reference');
    const range = rangeFrom(ref);
    const text = document.getText(range);
    assertUserClaim(
      !['other', 'self', 'global'].includes(text),
      'Cannot rename special variables',
    );
    const signifier = ref.item;
    assertUserClaim(signifier, 'No signifier found for reference');
    assertUserClaim(signifier.name, 'No name found for signifier');
    assertUserClaim(
      text === ref.item.name,
      'Reference text does not match identifier name',
    );
    assertUserClaim(!signifier.native, 'Cannot rename native functions');
    assertUserClaim(!signifier.asset, 'Asset renaming not yet implemented');
    return { ref, text, range };
  }

  prepareRename(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<
    vscode.Range | { range: vscode.Range; placeholder: string }
  > {
    // Find the signifier ref at this position
    const toRename = this.assertRenameableReference(document, position);
    return toRename.range;
  }

  provideRenameEdits(
    document: vscode.TextDocument,
    position: vscode.Position,
    newName: string,
  ) {
    const toRename = this.assertRenameableReference(document, position);
    const refs = toRename.ref.item.refs;
    const edits = new vscode.WorkspaceEdit();
    for (const ref of refs) {
      // Get the corresponding URI
      const uri = vscode.Uri.file(ref.file.path.absolute);
      const text = ref.file.getTextAt(ref.start.offset, ref.end.offset);
      if (text !== toRename.text) {
        continue;
      }
      edits.replace(uri, rangeFrom(ref), newName);
    }

    return edits;
  }

  static register(provider: StitchWorkspace) {
    return vscode.languages.registerRenameProvider(
      { language: 'gml', scheme: 'file' },
      new StitchRenameProvider(provider),
    );
  }
}
