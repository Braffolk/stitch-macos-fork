import { pathy } from '@bscotch/pathy';
import { Yy, Yyp, YypResource } from '@bscotch/yy';
import path from 'path';
import vscode from 'vscode';
import { GmlFile } from './language.file.js';
import { GameMakerResource } from './language.resource.js';

export class GameMakerProject
  implements vscode.TreeDataProvider<GameMakerResource | vscode.TreeItem>
{
  /**
   * Globally available completions specific to this project,
   * such as resource names, macros, and script functions. */
  completions: Map<string, vscode.CompletionItem> = new Map();
  hovers: Map<string, vscode.Hover> = new Map();
  signatures: Map<string, vscode.SignatureHelp> = new Map();
  definitions: Map<string, vscode.Location> = new Map();
  identifiers: Map<string, vscode.Location[]> = new Map();

  resources: Map<string, GameMakerResource> = new Map();
  resourceTree: Map<string, Set<GameMakerResource>> = new Map();
  yypWatcher: vscode.FileSystemWatcher;
  gmlWatcher: vscode.FileSystemWatcher;
  protected yyp!: Yyp;

  protected constructor(readonly yypPath: vscode.Uri) {
    this.yypWatcher = vscode.workspace.createFileSystemWatcher(
      this.yypPath.fsPath,
    );
    this.gmlWatcher = vscode.workspace.createFileSystemWatcher(
      path.join(this.rootPath, '**', '*.gml'),
    );
    this.yypWatcher.onDidChange(() => this.loadYyp());
    this.gmlWatcher.onDidChange((uri) => this.updateFile(uri));
  }

  protected gmlFiles: Map<string, GmlFile> = new Map();

  async getTreeItem(element: GameMakerResource): Promise<vscode.TreeItem> {
    return element;
  }

  async getChildren(
    element?: GameMakerResource | vscode.TreeItem,
  ): Promise<(GameMakerResource | vscode.TreeItem)[]> {
    if (!element) {
      // Then we're at the root
      return Array.from(this.resourceTree.keys())
        .sort()
        .map((x) => {
          const item = new vscode.TreeItem(
            x,
            vscode.TreeItemCollapsibleState.Collapsed,
          );
          item.contextValue = 'folder';
          return item;
        });
    }
    return Array.from(this.resourceTree.get(element.label!) || []);
  }

  get rootPath(): string {
    return path.dirname(this.yypPath.fsPath);
  }

  includesFile(file: vscode.Uri): boolean {
    return path.relative(file.path, this.rootPath).startsWith('..');
  }

  /**
   * Determine which resource this file belongs to,
   * and pass an update request to that resource.
   */
  async updateFile(doc: vscode.Uri | vscode.TextDocument): Promise<void> {
    const uri = doc instanceof vscode.Uri ? doc : doc.uri;
    const resourceId = this.filepathToResourceId(uri);
    const resource = this.resources.get(resourceId);
    if (!resource) {
      console.error(`Could not find resource for file ${uri}`);
    } else {
      await resource.loadFile(doc);
    }
  }

  async registerResource(info: YypResource): Promise<GameMakerResource> {
    const resourceId = this.filepathToResourceId(info.id.path);
    if (this.resources.has(resourceId)) {
      return this.resources.get(resourceId)!;
    }
    const resource = await GameMakerResource.from(this, info);
    this.resources.set(resourceId, resource);
    this.completions.set(resourceId, resource.completion);
    this.hovers.set(resource.name, await resource.createHover());
    this.resourceTree.set(
      resource.type,
      this.resourceTree.get(resource.type) || new Set(),
    );
    this.resourceTree.get(resource.type)!.add(resource);
    return resource;
  }

  /**
   * Given a document, return the expected path identifier that
   * the resource it belongs to would have.
   */
  public filepathToResourceId(
    doc: vscode.TextDocument | vscode.Uri | string,
  ): string {
    const uri =
      typeof doc === 'string'
        ? doc
        : doc instanceof vscode.Uri
        ? doc.fsPath
        : doc.uri.fsPath;
    const normalized = pathy(this.rootPath).relativeTo(
      path.resolve(this.rootPath, uri),
    );
    const resourceId = normalized.split('/').slice(0, 2).join('/');
    return resourceId;
  }

  async loadYyp() {
    this.yyp = await Yy.read(this.yypPath.fsPath, 'project');
    const waits: Promise<any>[] = [];
    for (const resource of this.yyp.resources) {
      waits.push(this.registerResource(resource));
    }
    await Promise.all(waits);
  }

  static async from(yypPath: vscode.Uri) {
    const project = new GameMakerProject(yypPath);
    await project.loadYyp();
    return project;
  }
}
