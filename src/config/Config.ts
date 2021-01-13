import * as dotenv from 'dotenv';

dotenv.config();

const app: EnvObject = {
  port: process.env.PORT
}

const unity: EnvObject = {
  host: process.env.UNITY_HOST,
  port: process.env.UNITY_PORT
}

const db: EnvObject = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME
}

export { app, unity, db };
