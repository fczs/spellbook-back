type MessageTypes = 'match' | 'event' | 'record' | 'partitions';

type FeedList = {
  [K in keyof MessageTypes]: object;
};

interface FeedChunk extends FeedList {
  type: string
}
