import os from 'os';
import { pathy } from '@bscotch/pathy';

export const defaultCacheDir = pathy(
  os.tmpdir(),
  '@bscotch/gamemaker-releases',
);

export const defaultNotesCachePath = defaultCacheDir.join(
  'release-notes-cache.json',
);

export const currentOsCode =
    os.platform() === 'win32'
        ? 'win'
        : os.platform() === 'darwin'
            ? 'mac'
            : os.platform() === 'linux'
                ? 'linux'
                : undefined;