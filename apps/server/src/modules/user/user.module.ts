import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsModule } from '../aws/aws.module';
import { EncryptionModule } from '../encryption/encryption.module';
import { UserAvatarEntity, UserAvatarTokenEntity } from './entities/user-avatar.entity';
import { UserEntity } from './entities/user.entity';
import { UserAvatarDataloader } from './user-avatar.loader';
import { UserResolver } from './user.resolver';
import { UserSubscriber } from './user.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserAvatarEntity, UserAvatarTokenEntity]), EncryptionModule, AwsModule],
  providers: [UserResolver, UserSubscriber, UserAvatarDataloader],
  exports: [UserAvatarDataloader],
  controllers: [],
})
export class UserModule {}
