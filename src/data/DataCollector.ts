import UnityFeed from '../unity/UnityFeed';

class DataCollector {
  private client: UnityFeed;

  constructor(client: UnityFeed) {
    this.client = client;
  }

  public fetch(saveChunk: feedStorage): void {
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
          saveChunk(JSON.parse(chunk));
          chunk = '';
        }
      }
    });
  }
}

export default DataCollector;
