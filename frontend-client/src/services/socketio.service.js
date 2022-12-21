import { io } from 'socket.io-client';

export default class SocketIoService {
    socket;
    constructor() {}

    setupSocketConnection() {
        this.socket = io('http://localhost:3001');
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}
