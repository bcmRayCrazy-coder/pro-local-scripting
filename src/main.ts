import chalk from 'chalk';
import code from './launch/code';
import { existsSync, fstat } from 'fs';
import { launchServer } from './launch/server';
import { checkFiles } from './launch/check';
import { getConfig, setScriptPath } from './config';
import { program } from 'commander';

program
    .name('Pro Local Scripting')
    .version('1.0.0')
    .argument('<scripting-dictionary>')
    .action((scriptPath) => {
        setScriptPath(scriptPath);

        async function launch() {
            console.log(chalk.bold.green('Launching Pro Local Scripting'));
            const config = await getConfig();
            await launchServer(config.port, config.mapId);
            code();
        }

        checkFiles().then(launch);
    })
    .parse();
