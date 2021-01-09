import { Socket } from 'net';
import { connect } from '../config/Config';
import { error } from '../utils/Utils';

class UnityFeed extends Socket {
  private host?: string = connect.host;
  private port?: string = connect.port;

  constructor() {
    super();

    if (this.host && this.port) {
      console.log(`Connecting to ${this.host}:${this.port} ...`);
      this.connect(parseInt(this.port), this.host, () => {
        console.log('Socket connected');
      });
    } else {
      error('Connect parameters are not defined');
    }
  }

  public start(): void {
    this.write(JSON.stringify({ type: 'SUBSCRIBE' }));
    console.log('Fetching the feed...');
  }

  public stop(): void {
    this.write(JSON.stringify({ type: 'UNSUBSCRIBE' }));
    console.log('Connection closed');
  }
}

export default UnityFeed;
