import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import db from './connectors/MongoConnector';
import DataCollector from './data/DataCollector';
import { app as conf } from './config/Config';

const app = express();
const collector = new DataCollector();

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
collector.fetch(collector.chunkHandler);

/*
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Running...');
});

app.listen(conf.port, () => console.log(`Server running on port ${conf.port}`));
*/
