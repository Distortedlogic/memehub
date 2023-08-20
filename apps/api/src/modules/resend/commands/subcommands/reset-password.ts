import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { render } from '@react-email/render';
import { isEmail } from 'class-validator';
import { CommandRunner, Option, SubCommand } from 'nest-commander';
import { serverEnvironment } from '../../../../config/services/server.config';
import { ResetPasswordEmail } from '../../emails/reset-password';
import { ResendClient } from '../../resend.service';

interface CommandOptions {
  email: string;
}

@SubCommand({ name: 'reset-password' })
export class ResetPasswordCommand extends CommandRunner {
  constructor(
    @Inject(serverEnvironment.KEY)
    private readonly serverEnv: ConfigType<typeof serverEnvironment>,
    private readonly resendClient: ResendClient,
  ) {
    super();
  }

  @Option({
    flags: '-e, --email [email]',
    description: 'Email address to send to',
  })
  parseEmail(val: string): string {
    if (!isEmail(val)) throw new Error('invalid email');
    return val;
  }

  async run(_passedParam: any[], { email }: CommandOptions) {
    try {
      await this.resendClient.emails.send({
        from: 'NoReply@lobbymatic.com',
        to: email,
        subject: 'Reset Your Lobbymatic Password',
        html: render(
          ResetPasswordEmail({
            link: `${this.serverEnv.frontendUrl}/auth/change-password?tokenId=${'test'}`,
            firstName: 'Herp',
            lastName: 'Derp',
          }) as any,
        ),
      });
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}
