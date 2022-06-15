import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'boghdady',
  password: 'pass123',
  database: 'meduimdb',
};

export default config;
