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
exports.startBuilder = void 0;
const config_1 = require("../config");
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const chokidar_1 = require("chokidar");
const child_process_1 = require("child_process");
const bundle_1 = __importDefault(require("./bundle"));
function packAndDeploy(config, basePath, io) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = yield (0, bundle_1.default)(config, basePath);
        console.log(chalk_1.default.gray('[+] Code bundled'));
        io.emit('change', code);
    });
}
function fileChange(config, basePath, io) {
    console.log(chalk_1.default.gray('[*] Watch file changed'));
    if (config.beforeBundle) {
        (0, child_process_1.exec)(`cd ${(0, config_1.getScriptPath)()} && ${config.beforeBundle}`, (err, stdout, stderr) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                throw err;
            if (stdout)
                console.log(stdout);
            if (stderr)
                console.error(stderr);
            packAndDeploy(config, basePath, io);
        }));
        return;
    }
    packAndDeploy(config, basePath, io);
}
function startBuilder(io) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = yield (0, config_1.getConfig)();
        const basePath = (0, config_1.getScriptPath)();
        (0, chokidar_1.watch)(path_1.default.join(basePath, config.watch)).on('change', (path, stats) => {
            fileChange(config, basePath, io);
        });
    });
}
exports.startBuilder = startBuilder;
