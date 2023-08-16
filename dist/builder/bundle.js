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
const rollup_1 = require("rollup");
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
function generateOutputs(bundle, config, basePath) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bundle.write({
            format: 'cjs',
            file: path_1.default.join(basePath, config.dist),
            banner: config.banner,
        });
    });
}
function bundle(config, basePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var bundle = yield (0, rollup_1.rollup)({
                input: path_1.default.join(basePath, config.entry),
            });
            yield generateOutputs(bundle, config, basePath);
            yield bundle.close();
        }
        catch (err) {
            console.error(chalk_1.default.red(err));
        }
    });
}
exports.default = bundle;
