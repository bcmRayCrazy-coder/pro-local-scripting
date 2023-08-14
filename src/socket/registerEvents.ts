import { Socket } from 'socket.io';
import { fetchDeclaretion } from './events/fetchDeclaretion';
import { disconnect } from './events/disconnect';

export default function registerEvents(socket: Socket) {
    socket.on('fetchDeclaretion', fetchDeclaretion);
    socket.on('disconnect', disconnect);
}
