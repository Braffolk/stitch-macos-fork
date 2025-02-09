import { literal } from '@bscotch/utility/browser';
import type { Channel } from './feeds.types.js';

export function ideFeedUrls(osCode: 'win' | 'mac' | 'linux') {
  const prefix = `https://gms.yoyogames.com/update-${osCode}`;

  return literal({
    lts: `${prefix}-LTS.rss`,
    stable: `${prefix}.rss`,
    beta: `${prefix}-NuBeta.rss`,
    unstable: `${prefix}-NuBeta-I.rss`,
  }) satisfies { [c in Channel]: string };
}

export function runtimeFeedUrls() {
  const prefix = `https://gms.yoyogames.com/Zeus-Runtime`;
  return literal({
    lts: `${prefix}-LTS.rss`,
    stable: `${prefix}.rss`,
    beta: `${prefix}-NuBeta.rss`,
    unstable: `${prefix}-NuBeta-I.rss`,
  }) satisfies { [c in Channel]: string };
}
