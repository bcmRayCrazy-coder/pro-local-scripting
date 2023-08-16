import { PlsConfig, getConfig, getScriptPath } from '../config';
import path from 'path';
import chalk from 'chalk';
import { watch } from 'chokidar';
import { exec } from 'child_process';
import bundle from './bundle';
import { Server } from 'socket.io';
import { readFile } from 'fs/promises';

async function packAndDeploy(config: PlsConfig, basePath: string, io: Server) {
    await bundle(config, basePath);
    console.log(chalk.gray('[+] Code bundled'));
    var code = (await readFile(path.join(basePath, config.dist))).toString();
    io.emit('change', code);
}

function fileChange(config: PlsConfig, basePath: string, io: Server) {
    console.log(chalk.gray('[*] Watch file changed'));
    if (config.beforeBundle) {
        try {
            exec(
                `cd ${getScriptPath()} && ${config.beforeBundle}`,
                async (err, stdout, stderr) => {
                    if (err) throw err;
                    if (stdout) console.log(stdout);
                    if (stderr) console.error(stderr);
                    packAndDeploy(config, basePath, io);
                },
            );
        } catch (err) {
            console.error(chalk.red(err));
        }
        return;
    }
    packAndDeploy(config, basePath, io);
}

export async function startBuilder(io: Server) {
    const config = await getConfig();
    const basePath = getScriptPath();
    watch(path.join(basePath, config.watch)).on('change', (path, stats) => {
        fileChange(config, basePath, io);
    });
}
