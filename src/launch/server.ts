import chalk from 'chalk';
import express from 'express';
import _http from 'http';
import { Server } from 'socket.io';
import registerEvents from '../socket/registerEvents';

function launchServer(port: number, mapId: string): Promise<void> {
    return new Promise((res) => {
        const app = express();
        const http = _http.createServer(app);
        const io = new Server(http, {
            cors: {
                origin: 'https://view.dao3.fun',
            },
        });

        app.get('/', (req, res) => {
            res.json({
                pls: true,
                version: '1.0.0',
            });
        });

        io.on('connection', (socket) => {
            // avoid map repeating
            const auth = socket.handshake.auth;
            if (auth.mapId != mapId) {
                socket.disconnect();
                return console.warn(
                    chalk.yellow(
                        `[!] Map(${auth.mapId}) tried to connect but reject.`,
                    ),
                );
            }

            console.log(chalk.gray(`[i] Connected with map(${mapId}).`));
            registerEvents(socket);
        });

        http.listen(port, () => {
            console.log(chalk.gray(`[i] Local server run on port ${port}.`));
            res();
        });
    });
}

export { launchServer };
