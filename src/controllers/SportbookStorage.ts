import Match, { IMatch } from '../models/Match';
import Logger from '../utils/Logger';
import { error } from '../utils/Utils';

export function chunkHandler(chunk: FeedChunk): void {
  if (chunk.hasOwnProperty('match')) {
    let fn: MatchFunctions = chunk.type.toLowerCase();

    chunk.match.forEach((match: UMatch) => {
      if (fn in global && typeof global[fn] === 'function') {
        global[fn](match);
      }
    });
  }
}

export function match_insert(match: UMatch): void {
  let entry = new Match(match);

  entry.unity_id = match.id;
  entry.save().catch(error);
}

export function match_update(match: UMatch): void {
  Match.findOne({ unity_id: match.id }, (err: Error, dbMatch: IMatch) => {
    if (err) {
      new Logger().error(
        `Error on update Match ID ${match.id}: ${err.message}`
      );
    }
/*
    Object.keys(match).forEach((key: string) => {
      dbMatch[key] = match[key];
    });*/

    dbMatch.save().catch(error);
  });
}

export function match_delete(match: UMatch): void {
  Match.findOneAndDelete({ unity_id: match.id }).catch(error);
}
