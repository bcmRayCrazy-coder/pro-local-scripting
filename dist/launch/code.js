"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
const config_1 = require("../config");
function code() {
    (0, child_process_1.exec)('code ' + (0, config_1.getScriptPath)(), (error, stdout, stderr) => {
        if (error)
            console.error(chalk_1.default.red(`Unable to launch Visual Studio Code!
Please press "F1" and enter " > Shell Command: Install 'code' command in PATH "
You have to open it manually this time.`));
        else
            console.log(chalk_1.default.gray('[i] Launched Workspace'));
    });
}
exports.default = code;
