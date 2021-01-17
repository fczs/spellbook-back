type TChunk =
  | 'RESET'
  | 'REFRESH'
  | 'MATCH_INSERT'
  | 'MATCH_UPDATE'
  | 'MATCH_DELETE';

type TFeedListTypes = 'match' | 'event' | 'record' | 'partitions';
type TOdds = 'LIVE' | 'EARLY' | 'TODAY';
type TSport = 'SOCCER' | 'TENNIS' | 'BASKETBALL';

type TPartition = {
  source: string;
  oddType: TOdds;
  sportType: TSport;
};

interface UMatch extends MixedObject {
  id: string;
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

type TFeedList = {
  [K in keyof TFeedListTypes]: Array<TPartition | UMatch>;
};

interface FeedChunk extends TFeedList {
  type: TChunk;
}

interface FeedStorage {
  (chunk: FeedChunk): void;
}

type ChunkFunctions = Lowercase<TChunk>;

interface String {
  toLowerCase(this: TChunk): ChunkFunctions;
}

interface ISportbook {
  reset(partition: TPartition): void;
  refresh(partition: TPartition): void;
  match_insert(match: UMatch): void;
  match_update(match: UMatch): void;
  match_delete(match: UMatch): void;
}
