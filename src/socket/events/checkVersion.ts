import { Socket } from 'socket.io';
import version from '../../version';

export async function checkVersion(socket: Socket) {
    socket.emit('version', version);
}
