"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const traverse_1 = __importDefault(require("@babel/traverse"));
const core_1 = require("@babel/core");
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const promises_1 = require("fs/promises");
// import { minify } from '@putout/minify';
function bundle(config, basePath) {
    return __awaiter(this, void 0, void 0, function* () {
        var ID = 0;
        function toLocalFilename(path) {
            const dots = path.split('.');
            if (dots[dots.length - 1] != 'js')
                path += '.js';
            return path;
        }
        function getFileAst(path, sourceType) {
            const content = fs_1.default.readFileSync(toLocalFilename(path)).toString();
            var ast = (0, core_1.parseSync)(content, {
                sourceType: sourceType == 'module' ? 'module' : 'script',
            });
            return ast;
        }
        function createAssets(filename, sourceType) {
            const dependencies = [];
            const ast = getFileAst(filename, sourceType);
            if (!ast)
                throw new Error('Cannot parse ast at ' + filename);
            (0, traverse_1.default)(ast, {
                ImportDeclaration({ node }) {
                    dependencies.push(node.source.value);
                },
            });
            const id = ID++;
            const transformResult = (0, core_1.transformFromAstSync)(ast, fs_1.default.readFileSync(toLocalFilename(filename)).toString(), {
                presets: ['env'],
            });
            if (!transformResult)
                throw new Error('Cannot parse ast at ' + filename);
            const { code } = transformResult;
            if (!code)
                throw new Error('Cannot get code from ' + filename);
            return {
                code,
                id,
                filename,
                dependencies,
                mapping: {},
            };
        }
        function createGraph(entry, sourceType) {
            const mainAsset = createAssets(entry, sourceType);
            const queue = [mainAsset];
            for (const asset of queue) {
                asset.mapping = {};
                const dirname = (0, path_1.dirname)(asset.filename);
                asset.dependencies.forEach((relativePath) => {
                    const absolutePath = (0, path_1.join)(dirname, relativePath);
                    const child = createAssets(absolutePath, sourceType);
                    asset.mapping[relativePath] = child.id;
                    queue.push(child);
                });
            }
            return queue;
        }
        function pack(graph) {
            let modules = '';
            graph.forEach((mod) => {
                modules += `${mod.id}: [function (require, module, exports) { ${mod.code} },${JSON.stringify(mod.mapping)},],`;
            });
            const result = `(function(modules) {function require(id) {const [fn, mapping] = modules[id];function localRequire(name) {return require(mapping[name]);}const module = { exports : {} };fn(localRequire, module, module.exports); return module.exports;}require(0);})({${modules}})`;
            return result;
        }
        const graph = createGraph((0, path_1.join)(basePath, config.entry), config.type);
        var bundledCode = pack(graph);
        // bundledCode = minify(bundledCode);
        yield (0, promises_1.writeFile)((0, path_1.join)(basePath, config.dist), bundledCode, 'utf-8');
        return bundledCode;
    });
}
exports.default = bundle;
