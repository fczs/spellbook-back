import UnityFeed from '../connectors/UnityFeed';
import SportbookStorage from '../controllers/SportbookStorage';

class DataCollector {
  private client: UnityFeed;
  private storage: SportbookStorage;

  constructor() {
    this.client = new UnityFeed();
    this.storage = new SportbookStorage();
  }

  public fetch(processData: FeedStorage): void {
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
          processData(chunkJson);
        }
      }
    });
  }

  public chunkHandler = (chunk: FeedChunk): void => {
    let fn: ChunkFunctions = chunk.type.toLowerCase();

    if (typeof this.storage[fn] === 'function') {
      let list: string = Object.keys(chunk).filter(
        (prop: string) => prop !== 'type'
      )[0];

      for (let item of chunk[list]) {
        this.storage[fn](item);
      }
    } /*else {
      new Logger().error(`Unknown chunk type: ${chunk.type}`);
    }*/
  }
}

export default DataCollector;
