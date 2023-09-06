import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:5000/graphql',
  documents: './gql/**/*.gql',
  overwrite: true,
  generates: {
    'generated/code.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
      config: {
        withHooks: true,
        withComponent: true,
      },
    },
    'generated/introspection.json': {
      plugins: ['urql-introspection'],
    },
  },
};

export default config;
