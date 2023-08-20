import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IEnvironments } from '../../config/environment.interface';
import { cardEnvironment } from '../../config/keys/card.config';
import { click2mailEnvironment } from '../../config/keys/click2mail.config';
import { companyEnvironment } from '../../config/keys/company.config';
import { Click2mailApi } from './click2mail.api';
import { AddressEntity } from './entities/address.entity';
import { AddressListEntity } from './entities/address.list.entity';
import { click2mailDocumentEntity } from './entities/click2mailDocument.entity';
import { CreditEntity } from './entities/credit.entity';
import { JobEntity } from './entities/job.entity';
import { JobLogEntity } from './entities/job.log.entity';
// API Docs
// https://developers.click2mail.com/reference/getaccountaddresses

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressEntity, click2mailDocumentEntity, JobEntity, JobLogEntity, AddressListEntity, CreditEntity]),
    ConfigModule.forRoot({ load: [companyEnvironment, cardEnvironment] }),
    HttpModule.registerAsync({
      imports: [ConfigModule.forRoot({ load: [click2mailEnvironment] })],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<IEnvironments, true>) => {
        const username = configService.get('click2mailEnvironment.username', { infer: true });
        const password = configService.get('click2mailEnvironment.password', { infer: true });
        return {
          baseURL: 'https://stage-rest.click2mail.com',
          headers: { Authorization: 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64') },
        };
      },
    }),
  ],
  providers: [Click2mailApi],
  exports: [],
})
export class Click2mailModule {}
