import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { render } from '@react-email/render';
import { Repository } from 'typeorm';
import { serverEnvironment } from '../config/services/server.config';
import { ResetPasswordEmail } from '../resend/emails/reset-password';
import { SignupEmail } from '../resend/emails/signup';
import { ResendClient } from '../resend/resend.service';
import { UserEntity } from '../user/entities/user.entity';
import { AuthTokenEntity, EAuthTokenType } from './entities/auth.token.entity';
import { RegisterTokenEntity } from './entities/signup.token.entity';
import { AvailableDTO } from './rest/AvailableDTO';
import { SignupEmailBody } from './rest/SignupEmailBody';
import { SuccessDTO } from './rest/SuccessDTO';
import { TokenIdBody } from './rest/TokenBody';
import { EmailBody, TokenIdPasswordBody } from './rest/TokenPasswordBody';
import { RegistrationBody } from './rest/UserRegistrationBody';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(serverEnvironment.KEY)
    private readonly serverEnv: ConfigType<typeof serverEnvironment>,
    @InjectRepository(UserEntity)
    public readonly userRepo: Repository<UserEntity>,
    @InjectRepository(AuthTokenEntity)
    public readonly authTokenRepo: Repository<AuthTokenEntity>,
    @InjectRepository(RegisterTokenEntity)
    public readonly registerTokenRepo: Repository<RegisterTokenEntity>,
    private readonly resendClient: ResendClient,
  ) {}

  @ApiOkResponse({ type: AvailableDTO })
  @Get('/is-email-available/:email')
  async isEmailAvailable(@Param('email') email: string): Promise<AvailableDTO> {
    return { available: !(await this.userRepo.findOneBy({ email })) };
  }

  @ApiOkResponse({ type: RegisterTokenEntity })
  @Get('/signup-token/:tokenId')
  async getSignupToken(@Param('tokenId') tokenId: string): Promise<RegisterTokenEntity> {
    return this.registerTokenRepo.findOneByOrFail({ id: tokenId });
  }

  @ApiBody({ type: RegistrationBody })
  @ApiOkResponse({ type: SuccessDTO })
  @Post('/register')
  async register(@Body() { firstName, lastName, password, tokenId }: RegistrationBody): Promise<SuccessDTO> {
    const { email } = await this.registerTokenRepo.findOneByOrFail({ id: tokenId });
    await this.registerTokenRepo.delete(tokenId);
    const user = await this.userRepo.save(this.userRepo.create({ firstName, lastName, email, password }));
    const verifyEmailToken = await this.authTokenRepo.save({ userId: user.id, type: EAuthTokenType.VerifyEmail });
    //TODO log emails and match to resend webhooks
    await this.resendClient.emails.send({
      from: 'NoReply@lobbymatic.com',
      to: email,
      subject: 'Verify Email for lobbymatic.com',
      html: render(SignupEmail({ link: `${this.serverEnv.frontendUrl}/auth/verify-email?tokenId=${verifyEmailToken.id}` }) as any),
    });
    return { success: true };
  }

  @ApiBody({ type: TokenIdBody })
  @ApiOkResponse({ type: SuccessDTO })
  @Post('/verify-email')
  async verifyEmail(@Body() { tokenId }: TokenIdBody): Promise<SuccessDTO> {
    const tokenEntity = await this.authTokenRepo.findOneByOrFail({ id: tokenId, type: EAuthTokenType.VerifyEmail });
    const updateResult = await this.userRepo.update(tokenEntity.userId, { emailVerified: true });
    if (!updateResult.affected) throw new Error('nothing updated');
    await this.authTokenRepo.delete(tokenId);
    return { success: true };
  }

  @ApiBody({ type: TokenIdPasswordBody })
  @ApiOkResponse({ type: SuccessDTO })
  @Post('/change-password')
  async changePassword(@Body() { tokenId, password }: TokenIdPasswordBody): Promise<SuccessDTO> {
    const tokenEntity = await this.authTokenRepo.findOneByOrFail({ id: tokenId, type: EAuthTokenType.ChangePassword });
    const updateResult = await this.userRepo.update(tokenEntity.userId, { password: password });
    await this.authTokenRepo.delete(tokenId);
    return { success: Boolean(updateResult.affected) };
  }

  @ApiBody({ type: EmailBody })
  @ApiOkResponse({ type: SuccessDTO })
  @Post('/forgot-password')
  async forgotPassword(@Body() { email }: EmailBody): Promise<SuccessDTO> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) return { success: false };
    const authToken = await this.authTokenRepo.save({ userId: user.id, type: EAuthTokenType.ChangePassword });
    await this.resendClient.emails.send({
      from: 'NoReply@lobbymatic.com',
      to: email,
      subject: 'Reset Your Lobbymatic Password',
      html: render(
        ResetPasswordEmail({
          link: `${this.serverEnv.frontendUrl}/auth/change-password?tokenId=${authToken.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
        }) as any,
      ),
    });
    return { success: true };
  }

  @ApiBody({ type: SignupEmailBody })
  @ApiOkResponse({ type: SuccessDTO })
  @Post('/send-signup-email')
  async sendSignupEmail(@Body() { email }: SignupEmailBody): Promise<SuccessDTO> {
    if (await this.userRepo.findOneBy({ email })) {
      throw new Error('email already used');
    }
    const registerToken = await this.registerTokenRepo.save({ email });
    // TODO try/catch? n delete token on fail?
    await this.resendClient.emails.send({
      from: 'NoReply@lobbymatic.com',
      to: email,
      subject: `Invite to 's Lobbymatic Acct`,
      html: render(SignupEmail({ link: `${this.serverEnv.frontendUrl}/auth/register?tokenId=${registerToken.id}` }) as any),
    });
    return { success: true };
  }
}
