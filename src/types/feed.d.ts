type TChunk =
  | 'RESET'
  | 'REFRESH'
  | 'MATCH_INSERT'
  | 'MATCH_UPDATE'
  | 'MATCH_DELETE';

type TFeedListTypes = 'match' | 'event' | 'record' | 'partitions';
type TOddTypes = 'LIVE' | 'EARLY' | 'TODAY';
type TSport = 'SOCCER' | 'TENNIS' | 'BASKETBALL';

type TPartition = {
  source: string;
  oddType: TOddTypes;
  sportType: TSport;
};

interface UMatch extends MixedObject {
  id: string;
  matchId?: string,
  sportType: string;
  // Match start time in epoch seconds
  startTime: number;
  league: string;
  host: string;
  guest: string;
}

interface UOdd extends MixedObject {
  id: number;
  oddId: string;
  source: string;
  matchId: string;
  eventId: string;
  oddType: TOddTypes;
  oddFormat: 'HK' | 'MALAY' | 'EU';
  lbType: 'BACK' | 'LAY';
  timeType: 'FT';
  pivotValue: number;
  pivotBias: 'HOST' | 'GUEST' | 'NEUTRAL';
  pivotType: 'HDP' | 'TOTAL' | 'ONE_TWO';
  isSwapped: boolean;
  rateOver: number;
  rateUnder: number;
  rateEqual: number;
}

type TFeedArrayTypes = TPartition | UMatch | UOdd;

type TFeedList = {
  [K in keyof TFeedListTypes]: Array<TFeedArrayTypes>;
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
  reset(chunk: FeedChunk): void;
  refresh(chunk: FeedChunk): void;
  match_insert(chunk: FeedChunk): void;
  match_update(chunk: FeedChunk): void;
  match_delete(chunk: FeedChunk): void;
  odd_insert(chunk: FeedChunk): void;
  odd_update(chunk: FeedChunk): void;
  odd_delete(chunk: FeedChunk): void;
}
