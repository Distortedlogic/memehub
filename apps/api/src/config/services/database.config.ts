import { registerAs } from '@nestjs/config';

export interface IDatabaseEnvironment {
  host: string;
  username: string;
  password: string;
  port: number;
  database: string;
  type: 'postgres';
}

export const databaseEnvironment = registerAs(
  'databaseEnvironment',
  (): IDatabaseEnvironment => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
  }),
);
