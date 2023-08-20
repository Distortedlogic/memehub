import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-local';
import { Repository } from 'typeorm';
import { EncryptionService } from '../../encryption/encryption.service';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  static key = 'local';

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly encryptionService: EncryptionService,
  ) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    const notAuth = !user || !user.emailVerified || !(await this.encryptionService.compare(password, user.password));
    if (notAuth) throw new UnauthorizedException();
    user.lastLogin = new Date();
    await this.userRepo.update(user.id, { lastLogin: user.lastLogin });
    return user;
  }
}
