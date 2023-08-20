import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Redis } from 'ioredis';
import { IEnvironments } from '../../config/environment.interface';
import { redisEnvironment } from '../../config/services/redis.config';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ load: [redisEnvironment] })],
  providers: [
    {
      provide: 'PUB_SUB',
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IEnvironments, true>) =>
        new RedisPubSub({
          publisher: new Redis(configService.get('redisEnvironment', { infer: true })),
          subscriber: new Redis(configService.get('redisEnvironment', { infer: true })),
        }),
    },
  ],
  exports: ['PUB_SUB'],
})
export class PubSubModule {}
