import { writeFileSync } from 'fs';
import DataCollector from './data/DataCollector';
import UnityFeed from './unity/UnityFeed';
import { error } from './utils/Utils';

const client = new UnityFeed();
const collection = new DataCollector(client);

collection.fetch()
.then(buffer => collection.parse(buffer))
.then(chunk => {
  writeFileSync('./feed/types.txt', chunk.type + '\n', { flag: 'a+' });

  writeFileSync('./feed/feed.json', JSON.stringify(chunk, null, 2), { flag: 'a+' });
})
.catch(error);
