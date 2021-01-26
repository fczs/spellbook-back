import Match from '../models/Match';
import Odd from '../models/Odd';
import { error, printAction } from '../utils/Utils';

class SportbookStorage implements ISportbook {
  public reset(chunk: FeedChunk): void {
    Match.deleteMany({}, undefined, (err) => {
      if (err) {
        error(err.message);
      } else {
        for (let partition of chunk['partitions']) {
          printAction(
            `${partition.source} ${partition.sportType} matches`,
            'clear'
          );
        }
      }
    });
    Odd.deleteMany({}, undefined, (err) => {
      if (err) {
        error(err.message);
      } else {
        for (let partition of chunk['partitions']) {
          printAction(
            `${partition.source} ${partition.sportType} odds`,
            'clear'
          );
        }
      }
    });
  }

  public refresh(chunk: FeedChunk): void {
    for (let partition of chunk['partitions']) {
      printAction(`${partition.source} ${partition.sportType}`, 'refresh');
    }
  }

  public match_insert(chunk: FeedChunk): void {
    for (let match of chunk.match) {
      match['matchId'] = match['id'];
    }

    Match.insertMany(chunk.match, undefined, (err, res) => {
      if (err) {
        error(err.message);
      } else {
        printAction(`Matches (${chunk.match.length})`, 'insert');
      }
    });
  }

  public async match_update(chunk: FeedChunk): Promise<void> {
    let i = 0;

    for (let match of chunk.match) {
      let res = await Match.updateOne({ matchId: match['id'] }, { match });

      i += res.nModified;
    }

    printAction(`Matches (${i})`, 'update');
  }

  public async match_delete(chunk: FeedChunk): Promise<void> {
    let i = 0;

    for (let match of chunk.match) {
      let res = await Match.deleteOne({ matchId: match['id'] });

      i += res.nModified;
    }

    printAction(`Matches (${i})`, 'delete');
  }

  public async odd_insert(chunk: FeedChunk): Promise<void> {
    chunk['record'].forEach((odd: Extract<TFeedArrayTypes, UOdd>) => {
      odd.oddId = this.getOddId(odd);
    });

    Odd.insertMany(chunk['record'], undefined, (err, res) => {
      if (err) {
        console.error(err.message);
      } else {
        printAction(`Odds (${chunk['record'].length})`, 'insert');
      }
    });
  }

  public async odd_update(chunk: FeedChunk): Promise<void> {
    let i = 0;

    chunk['record'].forEach(async (odd: Extract<TFeedArrayTypes, UOdd>) => {
      let res = await Odd.updateOne({ oddId: this.getOddId(odd) }, { odd });

      i += res.nModified;
      console.log(i)
    });

    printAction(`Odds (${i})`, 'update');
  }

  public async odd_delete(chunk: FeedChunk): Promise<void> {
    let i = 0;

    chunk['record'].forEach(async (odd: Extract<TFeedArrayTypes, UOdd>) => {
      let res = await Odd.deleteOne({ oddId: this.getOddId(odd) });

      i += res.nModified;
    });

    printAction(`Odds (${i})`, 'delete');
  }

  private getOddId(odd: UOdd): string {
    return `${odd.source}-${odd.matchId}-${odd.id}`;
  }
}

export default SportbookStorage;
