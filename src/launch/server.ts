import chalk from 'chalk';
import express from 'express';
import _http from 'http';
import { Server } from 'socket.io';
import registerEvents from '../socket/registerEvents';
import { startBuilder } from '../builder';

function launchServer(port: number, mapId: string): Promise<void> {
    return new Promise((res) => {
        const app = express();
        const http = _http.createServer(app);
        const io = new Server(http, {
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
                    console.warn(
                        chalk.yellow(
                            `[!] Map(${auth.mapId}) tried to connect but reject.`,
                        ),
                    );
                    listenConnection();
                    return;
                }

                console.log(chalk.gray(`[i] Connected with map(${mapId}).`));
                registerEvents(socket);
                if (!builderStarted) {
                    builderStarted = true;
                    startBuilder(io);
                }

                socket.on('disconnect', () => {
                    console.log(chalk.gray('[i] Disconnected'));
                    listenConnection();
                });
            });
        }
        listenConnection();

        http.listen(port, () => {
            console.log(chalk.gray(`[i] Local server run on port ${port}.`));
            res();
        });
    });
}

export { launchServer };
