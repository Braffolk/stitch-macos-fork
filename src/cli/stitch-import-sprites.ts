#!/usr/bin/env node
import commander, { CommanderStatic } from "commander";
import { oneline, undent } from "@bscotch/utility";
import importSprites from "./lib/import-sprites";
import { ImportBaseOptions } from "./lib/import-base-options";
import options from "./lib/cli-options";
import { SpriteImportOptions } from "../lib/Gms2Project";

const cli = commander;

cli.description(undent`
    Import sprite assets collection of images.
    A 'sprite' source is any folder whose immediate children
    are all PNGs with identical dimensions. Sprites can be
    nested.
    If the asset does not already exists in the target project,
    it will be placed in the "NEW" folder.
    Otherwise, the asset will be replaced by the source asset.`)
  .requiredOption("--source-path <path>", oneline`
    Path to the sprite folder or root folder containing multiple sprites.
  `)
  .option(...options.targetProjectPath)
  .option(...options.force)
  .option('--prefix <prefix>',oneline`
    Prefix the source names when creating/updateing sprites
    based on the source folders. Prefixing is performed after
    casing, so it will be used as-is.
  `)
  .option('--case <snake|camel|pascal>',oneline`
    Normalize the casing upon import. This ensures consistent
    casing of assets even if the source is either inconsistent
    or uses a different casing than intended in the game project.
  `,'snake')
  .option('--flatten <prefix>',oneline`
    By default each sprite resource is named by its final folder
    (e.g. a sprite at 'root/my/sprite' will be called 'sprite').
    Use this flag to convert the entire post-root path to the
    sprite's name (e.g. 'root/my/sprite' will be called 'my_sprite'
    if using snake case).
  `)
  .parse(process.argv);

importSprites(cli as ImportBaseOptions & SpriteImportOptions & CommanderStatic);
