import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { serverEnvironment } from '../../config/services/server.config';
import { EncryptionModule } from '../encryption/encryption.module';
import { FirmEntity } from '../firm/entities/firm.entity';
import { ResendModule } from '../resend/resend.module';
import { UserEntity } from '../user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthTokenEntity } from './entities/auth.token.entity';
import { RegisterTokenEntity } from './entities/signup.token.entity';
import { SessionSerializer } from './passport/auth.session.serializer';
import { LocalStrategy } from './passport/auth.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AuthTokenEntity, RegisterTokenEntity, FirmEntity]),
    ConfigModule.forRoot({ load: [serverEnvironment] }),
    PassportModule.register({ session: true }),
    EncryptionModule,
    ResendModule,
  ],
  providers: [LocalStrategy, SessionSerializer, AuthResolver],
  exports: [],
  controllers: [AuthController],
})
export class AuthModule {}
