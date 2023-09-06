import { registerAs } from '@nestjs/config';

export interface IResendEnvironment {
  resendKey: string;
}

export const resendEnvironment = registerAs(
  'resendEnvironment',
  (): IResendEnvironment => ({
    resendKey: process.env.RESEND_KEY,
  }),
);
