import Ajv, { JSONSchemaType } from 'ajv';
import chalk from 'chalk';
import { readFile } from 'fs/promises';
import path from 'path';
import version from './version';

var scriptPath = '';
var ajv = new Ajv();

export interface PlsConfig {
    version?: string;
    mapId: string;
    port: number;
    entry: string;
    dist: string;
    watch: string;
    beforeBundle?: string;
    type: 'module' | 'script';
    banner: string;
    autoFetchDeclare: boolean;
}

interface PlsRawConfig {
    version?: string;
    mapId: string;
    port: number;
    entry: string;
    dist: string;
    watch: string;
    beforeBundle?: string;
    type?: 'module' | 'script';
    banner?: string;
    autoFetchDeclare?: boolean;
}

const configSchema: JSONSchemaType<PlsRawConfig> = {
    type: 'object',
    properties: {
        version: { type: 'string', nullable: true },
        mapId: { type: 'string' },
        port: { type: 'integer' },
        entry: { type: 'string' },
        dist: { type: 'string' },
        watch: { type: 'string' },
        beforeBundle: { type: 'string', nullable: true },
        type: { type: 'string', nullable: true, enum: ['module', 'script'] },
        banner: { type: 'string', nullable: true },
        autoFetchDeclare: { type: 'boolean', nullable: true },
    },
    required: ['mapId', 'port', 'entry', 'dist', 'watch'],
    additionalProperties: false,
};

export async function getConfig(): Promise<PlsConfig> {
    const rawConfig: PlsRawConfig = JSON.parse(
        (await readFile(path.join(scriptPath, 'pls.json'))).toString(),
    );
    const validate = ajv.compile(configSchema);
    if (!validate(rawConfig)) {
        console.error(validate.errors);
        throw new Error(chalk.red('Invalid configuration'));
    }

    var config: PlsConfig = {
        mapId: '',
        port: 0,
        entry: '',
        dist: '',
        watch: '',
        type: 'script',
        banner: '',
        autoFetchDeclare: true,
    };
    Object.assign(config, rawConfig);

    if (!config.version)
        throw new Error(
            chalk.red(
                'Out-of-date configuration file! Or update config content. See at https://www.npmjs.com/package/pro-local-scripting#Configure',
            ),
        );

    if (config.version != version)
        console.warn(
            chalk.yellow(
                'PLS adds version check in both configuration and browser. Please all up to date',
            ),
        );
    throw new Error(
        chalk.red(
            'Different version! Config is',
            config.version,
            'but PLS is',
            version,
        ),
    );

    return config;
}

export function setScriptPath(path: string) {
    scriptPath = path;
}
export function getScriptPath(): string {
    return scriptPath;
}
