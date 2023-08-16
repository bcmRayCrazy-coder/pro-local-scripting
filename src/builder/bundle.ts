import { RollupBuild, rollup } from 'rollup';
import { PlsConfig } from '../config';
import chalk from 'chalk';
import path from 'path';

async function generateOutputs(
    bundle: RollupBuild,
    config: PlsConfig,
    basePath: string,
) {
    await bundle.write({
        format: 'cjs',
        file: path.join(basePath, config.dist),
        banner: config.banner,
    });
}

export default async function bundle(config: PlsConfig, basePath: string) {
    try {
        var bundle = await rollup({
            input: path.join(basePath, config.entry),
        });
        await generateOutputs(bundle, config, basePath);
        await bundle.close();
    } catch (err) {
        console.error(chalk.red(err));
    }
}
