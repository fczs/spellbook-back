import * as dotenv from 'dotenv';

dotenv.config();

const app: EnvObject = {
  port: process.env.PORT
}

const unity: EnvObject = {
  host: process.env.UNITY_HOST,
  port: process.env.UNITY_PORT
}

export { app, unity };
