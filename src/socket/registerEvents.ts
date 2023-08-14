import { Socket } from 'socket.io';
import { fetchDeclaretion } from './events/fetchDeclaretion';

export default function registerEvents(socket: Socket) {
    socket.on('fetchDeclaretion', fetchDeclaretion);
}
