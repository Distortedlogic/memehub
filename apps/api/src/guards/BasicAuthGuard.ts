import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { Observable } from 'rxjs';
import type { ISubscriptionContext } from 'src/interfaces/ISubscriptionContext';
import type { IGraphQLContext } from '../interfaces/IGraphQLContext';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  getPassport(context: ExecutionContext) {
    const gqlExecContext = GqlExecutionContext.create(context);
    const gqlContext = gqlExecContext.getContext<any>();
    if ((gqlContext as ISubscriptionContext).extra?.user) {
      return { gqlExecContext, userPassport: (gqlContext as ISubscriptionContext).extra.user! };
    }
    if ((gqlContext as IGraphQLContext).req.isAuthenticated()) {
      return { gqlExecContext, userPassport: gqlContext.req.session.passport.user };
    }
    return { gqlExecContext };
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext<any>();
    return Boolean((ctx as ISubscriptionContext).extra?.user) || Boolean((ctx as IGraphQLContext).req.isAuthenticated());
  }
}
