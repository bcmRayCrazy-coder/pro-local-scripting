"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDeclaretion = void 0;
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const config_1 = require("../../config");
const chalk_1 = __importDefault(require("chalk"));
function fetchDeclaretion(declareContent) {
    (0, promises_1.writeFile)(path_1.default.join((0, config_1.getScriptPath)(), 'game.d.ts'), declareContent, 'utf-8');
    console.log(chalk_1.default.gray('[*] Update game.d.ts from server'));
}
exports.fetchDeclaretion = fetchDeclaretion;
