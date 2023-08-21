import chalk from 'chalk';
import code from './launch/code';
import { launchServer } from './launch/server';
import { checkFiles } from './launch/check';
import { getConfig, setScriptPath } from './config';
import { program } from 'commander';
import version from './version';

program
    .name('Pro Local Scripting')
    .version(version)
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
