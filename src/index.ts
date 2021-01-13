import { writeFileSync } from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import db from './connectors/MongoConnector';

import DataCollector from './data/DataCollector';

import { app as conf } from './config/Config';

const app = express();
const collector = new DataCollector();

collector.fetch(/*(chunk) => {
  writeFileSync('./feed/feed.json', JSON.stringify(chunk, null, 2), {
    flag: 'a+',
  });
}*/);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
  res.send('Running...');
});

app.listen(conf.port, () => console.log(`Server running on port ${conf.port}`));
