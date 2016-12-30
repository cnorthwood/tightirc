import type { Socket } from 'net';

const EventEmitter = require('events');
const carrier = require('carrier');

class IRCSocket extends EventEmitter {

    constructor(socket: Socket) {
        super();
        carrier.carry(socket, (line) => {
            this._processLine(line);
        });
    }

    _processLine(line: string) {

    }

}

export default IRCSocket;
