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
exports.checkFiles = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
function checkFiles() {
    return __awaiter(this, void 0, void 0, function* () {
        const scriptPath = (0, config_1.getScriptPath)();
        if (!scriptPath)
            throw new Error(chalk_1.default.red('\nPlease enter script path!\nSee more at https://github.com/bcmRayCrazy-coder/pro-local-scripting/blob/main/README.md#Use'));
        if (!(0, fs_1.existsSync)(scriptPath))
            throw new Error(chalk_1.default.red('Invalid path ' + scriptPath));
        if (!(0, fs_1.existsSync)(path_1.default.join(scriptPath, 'pls.json')))
            throw new Error(chalk_1.default.red('\nCannot find config file!\nSee more at https://github.com/bcmRayCrazy-coder/pro-local-scripting/blob/main/README.md#Configure'));
    });
}
exports.checkFiles = checkFiles;
