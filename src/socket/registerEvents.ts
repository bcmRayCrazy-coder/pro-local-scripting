import { Socket } from 'socket.io';
import { fetchDeclaretion } from './events/fetchDeclaretion';
import { checkVersion } from './events/checkVersion';

export default function registerEvents(socket: Socket) {
    socket.on('fetchDeclaretion', fetchDeclaretion);
    socket.on('checkVersion',checkVersion);
}
