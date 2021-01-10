type ListTypes = 'match' | 'event' | 'record' | 'partitions';

type FeedList = {
  [K in keyof ListTypes]: object;
};

interface FeedChunk extends FeedList {
  type: string
}
