const withTM = require('next-transpile-modules')(['ui', 'utils', 'gql-client', 'rest-client', 'hooks', 'tailwind', 'meme-maker']);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['memehub-local.s3.amazonaws.com'],
  },
});
