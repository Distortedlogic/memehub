import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { awsEnvironment } from '../config/keys/aws.config';
import { AwsResolver } from './aws.resolver';
import { AwsS3 } from './aws.s3';

@Module({
  imports: [ConfigModule.forRoot({ load: [awsEnvironment] })],
  providers: [AwsS3, AwsResolver],
  exports: [AwsS3],
})
export class AwsModule {}
