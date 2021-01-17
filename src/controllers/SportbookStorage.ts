import Match, { IMatch } from '../models/Match';
import Logger from '../utils/Logger';
import { error, printMatchAction } from '../utils/Utils';

class SportbookStorage implements ISportbook {
  public reset(partition: TPartition): void {
    Match.deleteMany({}, undefined, (err) => {
      if (err) {
        error(err.message);
      } else {
        console.log(`${partition.source} matches cleared`);
      }
    });
  }

  public refresh(partition: TPartition): void {
    console.log(`Sportbook ${partition.source} refreshed`);
  }

  public match_insert(match: UMatch): void {
    let entry = new Match(match);

    entry.unity_id = match.id;
    entry
      .save()
      .then(() => printMatchAction(match, 'ADDED'))
      .catch(error);
  }

  public match_update(match: UMatch): void {
    Match.findOne({ unity_id: match.id }, (err: Error, entry: IMatch) => {
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
        .then(() => printMatchAction(match, 'UPDATED'))
        .catch(error);
    });
  }

  public match_delete(match: UMatch): void {
    Match.findOneAndDelete({ unity_id: match.id })
      .then(() => printMatchAction(match, 'DELETED'))
      .catch(error);
  }
}

export default SportbookStorage;
