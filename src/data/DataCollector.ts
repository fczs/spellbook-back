import UnityFeed from '../connectors/UnityFeed';

class DataCollector {
  private client: UnityFeed;

  constructor() {
    this.client = new UnityFeed();
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
}

export default DataCollector;
