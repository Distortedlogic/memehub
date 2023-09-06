import { registerAs } from '@nestjs/config';
import { RedisClientOptions } from '@songkeys/nestjs-redis';

export const redisEnvironment = registerAs(
  'redisEnvironment',
  (): RedisClientOptions => ({
    host: process.env.REDIS_MOD_HOST,
    port: parseInt(process.env.REDIS_MOD_PORT),
  }),
);
