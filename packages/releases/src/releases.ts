import { z } from 'zod';
import { gameMakerReleaseWithNotesSchema } from './feeds.types.js';
import { fetchJson } from './fetch.js';

/**
 * This package is used to generate a releases object, stored
 * as a JSON file for public download. The latest version of this
 * releases object can be downloaded from this URL.
 */
//export const releasesUrl =
//  'https://bscotch.github.io/stitch/artifacts/gamemaker/releases-summary.json';

// TODO - Separate releasesUrl per OS
export const releasesUrl = 'https://stitch-mac.s3.eu-central-1.amazonaws.com/releases-summary-mac.json';

/**
 * Given a URL to an already-synthesized
 * GameMaker Studio merged-releases feed,
 * download the feed and return the list of
 * releases.
 */
export async function fetchReleasesSummaryWithNotes(url = releasesUrl) {
  const releases = await fetchJson(
    url,
    z.array(gameMakerReleaseWithNotesSchema),
  );
  return releases;
}
