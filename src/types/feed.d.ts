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
  type: string;
}

interface FeedStorage {
  (chunk: FeedChunk): void;
}
