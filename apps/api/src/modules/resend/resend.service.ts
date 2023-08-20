import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Resend } from 'resend';
import { resendEnvironment } from '../../config/keys/resend.config';

@Injectable()
export class ResendClient extends Resend {
  constructor(
    @Inject(resendEnvironment.KEY)
    readonly resendEnv: ConfigType<typeof resendEnvironment>,
  ) {
    super(resendEnv.resendKey);
  }
}
