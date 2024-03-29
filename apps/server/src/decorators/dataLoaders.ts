import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { IGraphQLContext } from '../interfaces/IGraphQLContext';

export const DataLoaders = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => GqlExecutionContext.create(ctx).getContext<IGraphQLContext>().loaders,
);
