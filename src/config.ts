import chalk from 'chalk';
import { readFile } from 'fs/promises';
import path from 'path';

var scriptPath = '';

export interface PlsConfig {
    version: string;
    mapId: string;
    port: number;
}

export async function getConfig(): Promise<PlsConfig> {
    const config: PlsConfig = JSON.parse(
        (await readFile(path.join(scriptPath, 'pls.json'))).toString(),
    );
    if (!config.version || config.version != version)
        throw new Error(chalk.red('Invalid config version'));
    return config;
}

export function setScriptPath(path: string) {
    scriptPath = path;
}
export function getScriptPath(): string {
    return scriptPath;
}

export let version = '1.0.0';
