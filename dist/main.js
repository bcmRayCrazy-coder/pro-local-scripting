#!/usr/bin/env node
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
const chalk_1 = __importDefault(require("chalk"));
const code_1 = __importDefault(require("./launch/code"));
const server_1 = require("./launch/server");
const check_1 = require("./launch/check");
const config_1 = require("./config");
const commander_1 = require("commander");
commander_1.program
    .name('Pro Local Scripting')
    .version('1.2')
    .argument('<scripting-dictionary>')
    .action((scriptPath) => {
    (0, config_1.setScriptPath)(scriptPath);
    function launch() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(chalk_1.default.bold.green('Launching Pro Local Scripting'));
            const config = yield (0, config_1.getConfig)();
            yield (0, server_1.launchServer)(config.port, config.mapId);
            (0, code_1.default)();
        });
    }
    (0, check_1.checkFiles)().then(launch);
})
    .parse();
