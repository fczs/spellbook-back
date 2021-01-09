import * as net from 'net';
import { connect } from '../config/Config';

class UnityClient {
  private host?: string = connect.host;
  private port?: string = connect.port;

  readonly client: net.Socket;

  constructor() {
    this.client = new net.Socket();

    if (this.host && this.port) {
      this.connect(this.host, parseInt(this.port));
    } else {
      throw new Error('Connect parameters are undefined.');
    }
  }

  private connect(host: string, port: number) {
    console.log(`Connecting to ${host}:${port} ...`);

    this.client.connect(port, host, () => {
      console.log('Socket connected');
      this.client.write(JSON.stringify({ type: 'SUBSCRIBE' }));
    });
  }
}

export default UnityClient;
