import * as dotenv from 'dotenv';

dotenv.config();

const connect: EnvObject = {
  host: process.env.HOST,
  port: process.env.PORT
}

export { connect };
