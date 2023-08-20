import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import type { IGraphQLContext } from '../interfaces/IGraphQLContext';

export const UserPassport = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  if (ctx.getType<GqlContextType>() === 'graphql') {
    return GqlExecutionContext.create(ctx).getContext<IGraphQLContext>().req.user;
  }
  return ctx.switchToHttp().getRequest().user;
});
