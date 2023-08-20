import { Injectable } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { LocalStrategy } from './auth.strategy';

@Injectable()
export class DashboardPassport extends AuthGuard(LocalStrategy.key) {
  async canActivate(context: ExecutionContextHost): Promise<boolean> {
    await super.canActivate(context);
    await super.logIn(this.getRequest(context));
    return true;
  }

  getRequest(context: ExecutionContextHost) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    req.body = ctx.getArgs();
    return req;
  }
}
