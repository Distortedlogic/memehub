module.exports = {
  scripts: {
    "web-dev": "turbo run dev --no-daemon --scope web",
    "server-dev": "turbo run dev --no-daemon --scope server",
    "gen:gql": "turbo run gen --no-daemon --scope gql-client",
    "gen:rest": "turbo run gen --no-daemon --scope rest-client",
  },
};
