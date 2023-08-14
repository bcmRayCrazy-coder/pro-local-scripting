import chalk from 'chalk';
import { exec } from 'child_process';
import { getScriptPath } from '../config';

export default function code() {
    exec('code ' + getScriptPath(), (error, stdout, stderr) => {
        if (error)
            console.error(
                chalk.red(
                    `Unable to launch Visual Studio Code!
Please press "F1" and enter " > Shell Command: Install 'code' command in PATH "
You have to open it manually this time.`,
                ),
            );
        else console.log(chalk.gray('[i] Launched Workspace'));
    });
}
