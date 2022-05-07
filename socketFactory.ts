import {io} from 'socket.io-client';

export const init = () => {
  return;
};

export class SocketFactory {
  private _socket: any = undefined;
  constructor(public userId: string, private url: string) {}

  get socket() {
    return this._socket;
  }

  init = () => {
    this._socket = io(this.url, {
      path: '/api/chat/connect',
    });
    console.log(this._socket);
    this._socket.emit('register_user', this.userId);
  };
}
