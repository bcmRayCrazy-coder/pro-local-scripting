import { PlsConfig } from '../config';

import traverse from '@babel/traverse';
import { parseSync, transformFromAstSync } from '@babel/core';
import fs from 'fs';
import { dirname as toDirname, join } from 'path';
import { writeFile } from 'fs/promises';
// import { minify } from '@putout/minify';

export default async function bundle(config: PlsConfig, basePath: string) {
    var ID = 0;

    interface Asset {
        code?: string;
        id: number;
        filename: string;
        dependencies: string[];
        mapping: Record<string, number>;
    }

    function toLocalFilename(path: string): string {
        const dots = path.split('.');
        if (dots[dots.length - 1] != 'js') path += '.js';
        return path;
    }

    function getFileAst(path: string, sourceType: string) {
        const content = fs.readFileSync(toLocalFilename(path)).toString();
        var ast = parseSync(content, {
            sourceType: sourceType == 'module' ? 'module' : 'script',
        });
        return ast;
    }

    function createAssets(filename: string, sourceType: string): Asset {
        const dependencies: string[] = [];
        const ast = getFileAst(filename, sourceType);
        if (!ast) throw new Error('Cannot parse ast at ' + filename);
        traverse(ast, {
            ImportDeclaration({ node }) {
                dependencies.push(node.source.value);
            },
        });

        const id = ID++;

        const transformResult = transformFromAstSync(
            ast,
            fs.readFileSync(toLocalFilename(filename)).toString(),
            {
                presets: ['env'],
            }
        );
        if (!transformResult)
            throw new Error('Cannot parse ast at ' + filename);
        const { code } = transformResult;
        if (!code) throw new Error('Cannot get code from ' + filename);

        return {
            code,
            id,
            filename,
            dependencies,
            mapping: {},
        };
    }

    function createGraph(entry: string, sourceType: string) {
        const mainAsset = createAssets(entry, sourceType);

        const queue = [mainAsset];

        for (const asset of queue) {
            asset.mapping = {};

            const dirname = toDirname(asset.filename);

            asset.dependencies.forEach((relativePath) => {
                const absolutePath = join(dirname, relativePath);

                const child = createAssets(absolutePath, sourceType);

                asset.mapping[relativePath] = child.id;

                queue.push(child);
            });
        }

        return queue;
    }

    function pack(graph: Asset[]) {
        let modules = '';

        graph.forEach((mod) => {
            modules += `${mod.id}: [function (require, module, exports) { ${
                mod.code
            } },${JSON.stringify(mod.mapping)},],`;
        });

        const result = `(function(modules) {function require(id) {const [fn, mapping] = modules[id];function localRequire(name) {return require(mapping[name]);}const module = { exports : {} };fn(localRequire, module, module.exports); return module.exports;}require(0);})({${modules}})`;

        return result;
    }

    const graph = createGraph(join(basePath, config.entry), config.type);
    var bundledCode = pack(graph);
    // bundledCode = minify(bundledCode);
    await writeFile(join(basePath, config.dist), bundledCode, 'utf-8');
    return bundledCode;
}
