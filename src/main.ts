import chalk from 'chalk';
import code from './launch/code';
import { existsSync, fstat } from 'fs';
import { launchServer } from './launch/server';
import { checkFiles } from './launch/check';
import { getConfig, setScriptPath } from './config';

var scriptPath = process.argv[2];
setScriptPath(scriptPath);

async function launch() {
    console.log(chalk.bold.green('Launching Pro Local Scripting'));
    const config = await getConfig();
    await launchServer(config.port, config.mapId);
    code();
}

checkFiles().then(launch);
