import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsModule } from '../aws/aws.module';
import { FirmAvatarEntity, FirmAvatarTokenEntity } from './entities/firm-avatar.entity';
import { FirmEntity } from './entities/firm.entity';
import { FirmAvatarDataloader } from './firm-avatar.loader';
import { FirmResolver } from './firm.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([FirmEntity, FirmAvatarEntity, FirmAvatarTokenEntity]), AwsModule],
  providers: [FirmResolver, FirmAvatarDataloader],
  exports: [FirmAvatarDataloader],
})
export class FirmModule {}
