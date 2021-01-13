import UnityFeed from '../connectors/UnityFeed';
import { matchInsert } from '../controllers/SportbookStorage';

class DataCollector {
  private client: UnityFeed;

  constructor() {
    this.client = new UnityFeed();
  }

  public fetch(processData: FeedStorage|null = null): void {
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
          let chunkJson = JSON.parse(chunk);

          chunk = '';

          if (processData) {
            processData(chunkJson);
          } else {
            this.processData(chunkJson);
          }
        }
      }
    });
  }

  private processData(chunk: FeedChunk): void {
    switch (chunk.type) {
      case 'MATCH_INSERT':
        chunk.match.forEach((match: UMatch) => {
          matchInsert(match);
        });

        break;
    }
  }
}

export default DataCollector;
