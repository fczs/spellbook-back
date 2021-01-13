type ChunkTypes = 'MATCH_INSERT' | 'MATCH_UPDATE' | 'MATCH_DELETE';
type ListTypes = 'match' | 'event' | 'record' | 'partitions';

interface UMatch {
  id: string,
  sportType: string;
  // Match start time in epoch seconds
  startTime: number;
  // For team game matches
  league: string;
  host: string;
  guest: string;
  // For tennis matches
  competition: string;
  playerOne: string;
  playerTwo: string;
}

type FeedList = {
  [K in keyof ListTypes]: Array<UMatch>;
};

interface FeedChunk extends FeedList {
  type: ChunkTypes;
}

interface FeedStorage {
  (chunk: FeedChunk): void;
}

type MatchFunctions = `${Lowercase<ChunkTypes>}`;

interface String {
  toLowerCase(this: ChunkTypes) : MatchFunctions
}

declare function match_insert(match: UMatch): void;
declare function match_update(match: UMatch): void;
declare function match_delete(match: UMatch): void;
