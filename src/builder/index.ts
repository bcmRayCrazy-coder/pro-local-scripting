import { PlsConfig, getConfig, getScriptPath } from '../config';
import path from 'path';
import chalk from 'chalk';
import { watch } from 'chokidar';
import { exec } from 'child_process';
import bundle from './bundle';
import { Server } from 'socket.io';

async function packAndDeploy(config: PlsConfig, basePath: string, io: Server) {
    const code = await bundle(config, basePath);
    console.log(chalk.gray('[+] Code bundled'));
    io.emit('change', code);
}

function fileChange(config: PlsConfig, basePath: string, io: Server) {
    console.log(chalk.gray('[*] Watch file changed'));
    if (config.beforeBundle) {
        exec(config.beforeBundle, async (err, stdout, stderr) => {
            if (err) throw err;
            if (stdout) console.log(stdout);
            if (stderr) console.error(stderr);
            packAndDeploy(config, basePath, io);
        });
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
