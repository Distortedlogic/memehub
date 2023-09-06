import { RedisClientOptions } from '@songkeys/nestjs-redis';
import { IAWSEnvironment } from './keys/aws.config';
import { IResendEnvironment } from './keys/resend.config';
import { IDatabaseEnvironment } from './services/database.config';
import { IServerEnvironment } from './services/server.config';

export interface IEnvironments {
  databaseEnvironment: IDatabaseEnvironment;
  serverEnvironment: IServerEnvironment;
  redisEnvironment: RedisClientOptions;
  resendEnvironment: IResendEnvironment;
  awsEnvironment: IAWSEnvironment;
}
