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

  /**
   * Only chunk types with declared SportbookStorage methods are handled.
   * The rest are skipped. We have to declare methods for them to be supported.
   *
   * @param {FeedChunk} chunk
   */
  public chunkHandler = (chunk: FeedChunk): void => {
    let fn: ChunkFunctions = chunk.type.toLowerCase();

    if (typeof this.storage[fn] === 'function') {
      this.storage[fn](chunk);
    }
  };
}

export default DataCollector;
