import Match, { IMatch } from '../models/Match';
import Odd, { IOdd } from '../models/Odd';
import Logger from '../utils/Logger';
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

    Match.insertMany(chunk.match, {}, (err) => {
      if (err) {
        error(err.message);
      } else {
        printAction('Matches', 'insert');
      }
    });
    /*new Match(match)
      .save()
      .then(() => printMatchAction(match, 'insert'))
      .catch(error);*/
  }
  /*
  public match_update(match: UMatch): void {
    Match.findOne({ matchId: match.id }, (err: Error, entry: IMatch) => {
      if (err) {
        new Logger().error(
          `Error on update Match ID ${match.id}: ${err.message}`
        );
      }

      Object.keys(match).forEach((key: string) => {
        if (key !== 'id') {
          entry[key as keyof IMatch] = match[key as keyof UMatch];
        }
      });

      entry
        .save()
        .then(() => printMatchAction(match, 'update'))
        .catch(error);
    });
  }

  public match_delete(match: UMatch): void {
    Match.findOneAndDelete({ matchId: match.id })
      .then(() => printMatchAction(match, 'delete'))
      .catch(error);
  }
*/
  public odd_insert(chunk: FeedChunk): void {
    chunk['record'].forEach((odd: Extract<TFeedArrayTypes, UOdd>) => {
      odd.oddId = `${odd.source}-${odd.matchId}-${odd.id}`;
    });

    Odd.insertMany(chunk['record'], {}, (err) => {
      if (err) {
        error(err.message);
      } else {
        printAction('Odds', 'insert');
      }
    });

    /*odd.oddId = odd.id;
    new Odd(odd)
      .save()
      .then(() => printOddAction(odd, 'insert'))
      .catch(error);*/
  }
  /*
  public odd_update(odd: UOdd): void {
    Odd.findOne({ oddId: odd.id }, (err: Error, entry: IOdd) => {
      if (err) {
        new Logger().error(`Error on update Odd ID ${odd.id}: ${err.message}`);
      }

      Object.keys(odd).forEach((key: string) => {
        if (key !== 'id') {
          entry[key as keyof IOdd] = odd[key as keyof UOdd];
        }
      });

      entry
        .save()
        .then(() => printOddAction(odd, 'update'))
        .catch(error);
    });
  }

  public odd_delete(odd: UOdd): void {
    Match.findOneAndDelete({ oddId: odd.id })
      .then(() => printOddAction(odd, 'delete'))
      .catch(error);
  }*/
}

export default SportbookStorage;
