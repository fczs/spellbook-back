import { writeFileSync } from 'fs';
import UnityFeed from '../unity/UnityFeed';

class DataCollector {
  private client: UnityFeed;

  constructor(client: UnityFeed) {
    this.client = client;
    this.initClientListener();
  }

  private initClientListener(): void {
    let chunk: string = '';
    let stack: number = 0;

    this.client.on('data', (buffer: Buffer) => {
      for (let i = 0, len = buffer.length; i < len; i++) {
        let symb = String.fromCodePoint(buffer[i]);

        if (symb === '{') {
          stack++;
        } else if (symb === '}') {
          stack--;
        }

        chunk += symb;

        if (stack <= 0) {
          this.fileStorage(JSON.parse(chunk));
          chunk = '';
        }
      }
    });
  }

  private fileStorage(chunk: FeedChunk): void {
    writeFileSync('./feed/feed.json', JSON.stringify(chunk, null, 2), {
      flag: 'a+',
    });
  }
}

export default DataCollector;
