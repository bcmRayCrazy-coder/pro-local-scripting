import { writeFile } from 'fs/promises';
import path from 'path';
import { getConfig, getScriptPath } from '../../config';
import chalk from 'chalk';

export async function fetchDeclaretion(declareContent: string) {
    if (!(await getConfig()).autoFetchDeclare) return;
    await writeFile(
        path.join(getScriptPath(), 'game.d.ts'),
        declareContent,
        'utf-8',
    );
    console.log(chalk.gray('[*] Update game.d.ts from server'));
}
