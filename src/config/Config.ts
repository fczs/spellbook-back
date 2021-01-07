import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env'});

const connect: EnvObject = {
  host: process.env.HOST,
  port: process.env.PORT
}

export { connect };
