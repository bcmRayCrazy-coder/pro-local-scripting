import { writeFile } from 'fs/promises';
import path from 'path';
import { getScriptPath } from '../../config';
import chalk from 'chalk';

export function fetchDeclaretion(declareContent: string) {
    writeFile(path.join(getScriptPath(), 'game.d.ts'), declareContent, 'utf-8');
    console.log(chalk.gray('[*] Update game.d.ts from server'));
}
