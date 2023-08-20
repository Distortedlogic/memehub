import { Command, CommandRunner } from 'nest-commander';
import { ResetPasswordCommand } from './subcommands/reset-password';
import { SignupCommand } from './subcommands/signup';
import { VerifyEmailCommand } from './subcommands/verify-email';

@Command({
  name: 'email',
  subCommands: [VerifyEmailCommand, SignupCommand, ResetPasswordCommand],
})
export class EmailCommand extends CommandRunner {
  async run() {}
}
