import { z } from 'zod';
import { gameMakerReleaseWithNotesSchema } from './feeds.types.js';
import { fetchJson } from './fetch.js';

/**
 * This package is used to generate a releases object, stored
 * as a JSON file for public download. The latest version of this
 * releases object can be downloaded from this URL.
 */

export const releasesUrls = {
    win: 'https://stitch-mac.s3.eu-central-1.amazonaws.com/releases-summary-win.json',
    mac: 'https://stitch-mac.s3.eu-central-1.amazonaws.com/releases-summary-mac.json',
    linux: 'https://stitch-mac.s3.eu-central-1.amazonaws.com/releases-summary-linux.json'
}

/**
 * Given a URL to an already-synthesized
 * GameMaker Studio merged-releases feed,
 * download the feed and return the list of
 * releases.
 */
export async function fetchReleasesSummaryWithNotes(url = releasesUrls.win) {
  const releases = await fetchJson(
    url,
    z.array(gameMakerReleaseWithNotesSchema),
  );
  return releases;
}
