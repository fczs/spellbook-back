import * as fs from 'fs';
import UnityFeed from '../unity/UnityFeed';

class DataCollector {
  client: UnityFeed;

  constructor(client: UnityFeed) {
    this.client = client;
  }

  fetch(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      this.client.on('data', (data: Buffer) => {
        if (data.length > 0) {
          resolve(data);
        } else {
          reject('Feed is empty');
        }
      });
    });
  }

  parse(buffer: Buffer): Promise<FeedChunk> {
    let chunk: string = '';
    let stack: number = 0;

    return new Promise(resolve => {
      for (var i = 0, len = buffer.length; i < len; i++) {
        let symb = String.fromCodePoint(buffer[i]);

        if (symb === '{') {
          stack++;
        } else if (symb === '}') {
          stack--;
        }

        chunk += symb;

        if (stack <= 0) {
          resolve(JSON.parse(chunk));
        }
      }
    });
  }
}

export default DataCollector;
