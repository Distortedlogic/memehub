import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPassport } from '../../decorators/userPassport';
import { BasicAuthGuard } from '../../guards/BasicAuthGuard';
import type { IGraphQLContext } from '../../interfaces/IGraphQLContext';
import type { IUserPassport } from '../../interfaces/IUserPassport';
import { UserEntity } from '../user/entities/user.entity';
import { LoginArgs } from './args/LoginArgs';
import { DashboardPassport } from './passport/auth.passport';

@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepo: Repository<UserEntity>,
  ) {}

  @Query(() => UserEntity)
  @UseGuards(BasicAuthGuard)
  me(@UserPassport() { email }: IUserPassport) {
    return this.userRepo.findOneBy({ email });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @Mutation(() => UserEntity)
  @UseGuards(DashboardPassport)
  login(@UserPassport() passport: IUserPassport, @Args() _loginArgs: LoginArgs): Promise<UserEntity> {
    return passport as any;
  }

  @Mutation(() => Boolean)
  logout(@Context() { req }: IGraphQLContext) {
    req.logout(() => {});
    return true;
  }
}
