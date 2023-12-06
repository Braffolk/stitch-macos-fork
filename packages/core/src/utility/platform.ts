import process from "process";

// TODO - remove, duplicate behaviour.

export function deriveTargetPlatform() {
    if (process.platform === 'win32') {
        return 'windows';
    } else if (process.platform === 'darwin') {
        return 'mac';
    } else if (process.platform === 'linux') {
        return 'linux';
    } else {
        throw new Error(`Unsupported platform: ${process.platform}`);
    }
}