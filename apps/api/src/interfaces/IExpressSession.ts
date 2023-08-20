import type { Session } from 'express-session';
import type { IUserPassport } from './IUserPassport';

export interface IExpressSession extends Session {
  passport: { user: IUserPassport };
}
