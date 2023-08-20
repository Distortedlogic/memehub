import { RedisClientOptions } from '@songkeys/nestjs-redis';
import { IAWSEnvironment } from './keys/aws.config';
import { ICardEnvironment } from './keys/card.config';
import { IClick2mailEnvironment } from './keys/click2mail.config';
import { ICompanyEnvironment } from './keys/company.config';
import { ICongressGovEnvironment } from './keys/congress-gov.config';
import { IOpenaiEnvironment } from './keys/openapi.config';
import { IResendEnvironment } from './keys/resend.config';
import { IRssEnvironment } from './keys/rss.config';
import { IDatabaseEnvironment } from './services/database.config';
import { IServerEnvironment } from './services/server.config';

export interface IEnvironments {
  databaseEnvironment: IDatabaseEnvironment;
  serverEnvironment: IServerEnvironment;
  openaiEnvironment: IOpenaiEnvironment;
  redisEnvironment: RedisClientOptions;
  resendEnvironment: IResendEnvironment;
  awsEnvironment: IAWSEnvironment;
  congressGovEnvironment: ICongressGovEnvironment;
  click2mailEnvironment: IClick2mailEnvironment;
  companyEnvironment: ICompanyEnvironment;
  cardEnvironment: ICardEnvironment;
  rssEnvironment: IRssEnvironment;
}
