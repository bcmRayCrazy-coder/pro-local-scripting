import chalk from 'chalk';
import { existsSync } from 'fs';
import path from 'path';
import { getScriptPath } from '../config';

export async function checkFiles() {
    const scriptPath = getScriptPath();
    if (!scriptPath)
        throw new Error(
            chalk.red(
                '\nPlease enter script path!\nSee more at https://github.com/bcmRayCrazy-coder/pro-local-scripting/blob/main/README.md#Use',
            ),
        );

    if (!existsSync(scriptPath))
        throw new Error(chalk.red('Invalid path ' + scriptPath));

    if (!existsSync(path.join(scriptPath, 'pls.json')))
        throw new Error(
            chalk.red(
                '\nCannot find config file!\nSee more at https://github.com/bcmRayCrazy-coder/pro-local-scripting/blob/main/README.md#Configure',
            ),
        );
}
