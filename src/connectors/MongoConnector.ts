import mongoose from 'mongoose';
import { db as conf } from '../config/Config';

mongoose
  .connect(`${conf.host}:${conf.port}/${conf.name}`, { useNewUrlParser: true })
  .catch((e) => {
    console.error('Connection error: ', e.message);
  });

const db = mongoose.connection;

export default db;
