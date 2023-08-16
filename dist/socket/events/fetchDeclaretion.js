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
exports.fetchDeclaretion = void 0;
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const config_1 = require("../../config");
const chalk_1 = __importDefault(require("chalk"));
function fetchDeclaretion(declareContent) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield (0, config_1.getConfig)()).autoFetchDeclare)
            return;
        yield (0, promises_1.writeFile)(path_1.default.join((0, config_1.getScriptPath)(), 'game.d.ts'), declareContent, 'utf-8');
        console.log(chalk_1.default.gray('[*] Update game.d.ts from server'));
    });
}
exports.fetchDeclaretion = fetchDeclaretion;
