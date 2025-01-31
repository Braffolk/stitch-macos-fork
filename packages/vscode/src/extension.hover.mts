import { YySprite } from '@bscotch/yy';
import vscode from 'vscode';
import { assertUserClaim } from './assert.mjs';
import type { StitchWorkspace } from './extension.workspace.mjs';

export class StitchHoverProvider implements vscode.HoverProvider {
  constructor(readonly provider: StitchWorkspace) {}

  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.Hover> {
    const item = this.provider.getSignifier(document, position);
    if (!item) {
      return;
    }
    const hoverContents = new vscode.MarkdownString();
    const codeBlocks = new Set<string>();
    const textBlocks = new Set<string>();
    if (item.description) {
      textBlocks.add(item.description);
    }
    if (item.type.type.length === 0) {
      codeBlocks.add('Any');
    }
    for (const type of item.type.type) {
      const code = type.code;
      if (code) {
        codeBlocks.add(code);
      }
      if (type.description) {
        textBlocks.add(type.description);
      }
      if (type.details) {
        textBlocks.add(type.details);
      }
      // If it's a sprite, add preview images
      const sprite =
        type.kind === 'Asset.GMSprite' &&
        item.name &&
        this.provider.getAsset(document, item.name);
      if (sprite) {
        hoverContents.isTrusted = true;
        assertUserClaim(sprite.dir, 'Sprite must have a directory');
        hoverContents.baseUri = vscode.Uri.file(sprite.dir.absolute);
        hoverContents.supportHtml = true;
        const yy = sprite.yy as YySprite;
        let images = '';
        for (const frame of yy.frames) {
          const framePath = vscode.Uri.file(
            sprite.dir.join(`${frame.name}.png`).absolute,
          );
          images += `![Sprite subimage](${framePath})`;
        }
        textBlocks.add(images);
      }
    }

    if (!codeBlocks.size && !textBlocks.size) {
      return;
    }
    for (const code of codeBlocks) {
      hoverContents.appendCodeblock(code, 'gml');
    }
    for (const text of textBlocks) {
      hoverContents.appendMarkdown(text + '\n\n');
    }

    // console.log('Hovering over', item);
    return new vscode.Hover(hoverContents);
  }

  static register(provider: StitchWorkspace) {
    return vscode.languages.registerHoverProvider(
      { language: 'gml', scheme: 'file' },
      new StitchHoverProvider(provider),
    );
  }
}
