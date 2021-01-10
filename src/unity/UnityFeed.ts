import { Socket } from 'net';
import { connect } from '../config/Config';
import { error } from '../utils/Utils';

class UnityFeed extends Socket {
  private host?: string = connect.host;
  private port?: string = connect.port;

  constructor() {
    super();

    if (this.host && this.port) {
      this.start(parseInt(this.port), this.host);
    } else {
      error('Connect parameters are not defined.');
    }
  }

  public start(port: number, host: string): void {
    console.log(`Connecting to ${this.host}:${this.port} ...`);
    this.connect(port, host, () => {
      console.log('Socket connected');
      this.write(JSON.stringify({ type: 'SUBSCRIBE' }));
      console.log('Fetching the feed...');
    });
  }

  public stop(): void {
    console.log('Connection closed');
    this.write(JSON.stringify({ type: 'UNSUBSCRIBE' }));
    this.end();
  }
}

export default UnityFeed;
