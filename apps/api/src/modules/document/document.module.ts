import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsModule } from '../aws/aws.module';
import { DocumentEntity, DocumentTokenEntity } from './document.entity';
import { DocumentResolver } from './document.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntity, DocumentTokenEntity]), AwsModule],
  providers: [DocumentResolver],
  exports: [],
  controllers: [],
})
export class DocumentModule {}
