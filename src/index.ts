import DataCollector from './data/DataCollector';
import UnityFeed from './unity/UnityFeed';

const client = new UnityFeed();

new DataCollector(client);
