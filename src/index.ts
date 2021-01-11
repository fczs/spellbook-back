import { writeFileSync } from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import DataCollector from './data/DataCollector';
import UnityFeed from './unity/UnityFeed';

import { app as conf } from './config/Config';

const app = express();
const client = new UnityFeed();
const collector = new DataCollector(client);

collector.fetch((chunk) => {
  writeFileSync('./feed/feed.json', JSON.stringify(chunk, null, 2), {
    flag: 'a+',
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Running...');
});

app.listen(conf.port, () => console.log(`Server running on port ${conf.port}`));
