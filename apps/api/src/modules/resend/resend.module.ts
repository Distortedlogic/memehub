import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resendEnvironment } from '../../config/keys/resend.config';
import { serverEnvironment } from '../../config/services/server.config';
import { EmailCommand } from './commands/email';
import { ResetPasswordCommand } from './commands/subcommands/reset-password';
import { SignupCommand } from './commands/subcommands/signup';
import { VerifyEmailCommand } from './commands/subcommands/verify-email';
import { ResendClient } from './resend.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [resendEnvironment, serverEnvironment] })],
  providers: [ResendClient, EmailCommand, SignupCommand, ResetPasswordCommand, VerifyEmailCommand],
  exports: [ResendClient],
})
export class ResendModule {}
