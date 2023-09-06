import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import type { IUserPassport } from '../../../interfaces/IUserPassport';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser({ id, firstName, lastName, email }: UserEntity, done: Function) {
    const passport: IUserPassport = { userId: id, firstName, lastName, email };
    done(null, passport);
  }

  deserializeUser(payload: IUserPassport, done: Function) {
    done(null, payload);
  }
}
