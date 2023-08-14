"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchServer = void 0;
const chalk_1 = __importDefault(require("chalk"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const registerEvents_1 = __importDefault(require("../socket/registerEvents"));
const builder_1 = require("../builder");
function launchServer(port, mapId) {
    return new Promise((res) => {
        const app = (0, express_1.default)();
        const http = http_1.default.createServer(app);
        const io = new socket_io_1.Server(http, {
            cors: {
                origin: 'https://view.dao3.fun',
            },
        });
        var builderStarted = false;
        app.get('/', (req, res) => {
            res.json({
                pls: true,
                version: '1.0.0',
            });
        });
        function listenConnection() {
            io.once('connection', (socket) => {
                // avoid map repeating
                const auth = socket.handshake.auth;
                if (auth.mapId != mapId) {
                    socket.disconnect();
                    console.warn(chalk_1.default.yellow(`[!] Map(${auth.mapId}) tried to connect but reject.`));
                    listenConnection();
                    return;
                }
                console.log(chalk_1.default.gray(`[i] Connected with map(${mapId}).`));
                (0, registerEvents_1.default)(socket);
                if (!builderStarted) {
                    builderStarted = true;
                    (0, builder_1.startBuilder)(io);
                }
                socket.on('disconnect', () => {
                    console.log(chalk_1.default.gray('[i] Disconnected'));
                    listenConnection();
                });
            });
        }
        listenConnection();
        http.listen(port, () => {
            console.log(chalk_1.default.gray(`[i] Local server run on port ${port}.`));
            res();
        });
    });
}
exports.launchServer = launchServer;
