import chalk from 'chalk';
import { readFile } from 'fs/promises';
import path from 'path';

var scriptPath = '';

export interface PlsConfig {
    mapId: string;
    port: number;
    entry: string;
    dist: string;
    watch: string;
    beforeBundle?: string;
    type: 'module' | 'script';
    banner: string;
}

export async function getConfig(): Promise<PlsConfig> {
    var config: PlsConfig = JSON.parse(
        (await readFile(path.join(scriptPath, 'pls.json'))).toString(),
    );
    if (!config.type) config.type = 'script';
    if (!config.banner) config.banner = '';
    return config;
}

export function setScriptPath(path: string) {
    scriptPath = path;
}
export function getScriptPath(): string {
    return scriptPath;
}
