import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

export default new DataSource({
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/src/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/**/*.{ts,js}'],
});
