import { Cache, cacheExchange, ResolveInfo } from '@urql/exchange-graphcache';
import { simplePagination } from '@urql/exchange-graphcache/extras';
import { LogoutMutation, LogoutMutationVariables, schema } from 'gql-client';

export const normalizedCache = cacheExchange({
  schema,
  keys: {},
  resolvers: {
    Query: {
      getUsers: simplePagination({ limitArgument: 'take', offsetArgument: 'skip' }),
    },
  },
  updates: {
    Mutation: {
      logout: (_parent: LogoutMutation, _fieldArgs: LogoutMutationVariables, cache: Cache, _info: ResolveInfo) => {
        cache.invalidate('Query');
      },
    },
  },
});
