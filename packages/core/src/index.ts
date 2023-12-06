import { StitchProject } from './lib/StitchProject.js';
export * from './lib/StitchProject.js';
export * from './lib/StitchProjectConfig.js';
export type { FileDifferenceType } from './utility/files.js';
export { deriveTargetPlatform } from './utility/platform.js';
export { StitchProject as default } from './lib/StitchProject.js';

/**
 * Legacy alias for `StitchProject`.
 *
 * @deprecated
 */
export const Gms2Project = StitchProject;
