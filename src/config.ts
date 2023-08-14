import chalk from 'chalk';
import { readFile } from 'fs/promises';
import path from 'path';

var scriptPath = '';

export interface PlsConfig {
    mapId: string;
    port: number;
    entry: string;
}

export async function getConfig(): Promise<PlsConfig> {
    const config: PlsConfig = JSON.parse(
        (await readFile(path.join(scriptPath, 'pls.json'))).toString(),
    );
    return config;
}

export function setScriptPath(path: string) {
    scriptPath = path;
}
export function getScriptPath(): string {
    return scriptPath;
}
