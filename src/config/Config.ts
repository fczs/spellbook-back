import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env'});

const connect: StringObject = {
  host: process.env.HOST,
  port: process.env.PORT
}

export { connect };
