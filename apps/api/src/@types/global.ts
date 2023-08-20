declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // server itself
      ENV: 'local' | 'dev' | 'staging' | 'prod'; // is prod only when deployed to prod
      NODE_ENV: 'development' | 'production'; // is prod anytime app is built
      SECRET: string;
      ORIGIN_WHITE_LIST: string;
      FRONTEND_URL: string;
      BACKEND_HOST: string;

      DB_USER: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_DATABASE: string;

      REDIS_MOD_HOST: string;
      REDIS_MOD_PORT: string;

      // API keys
      NEW_RELIC_KEY: string;
      RESEND_KEY: string;
      OPENAI_KEY: string;
      CONGRESS_GOV_KEY: string;
      RSS_KEY: string;
      C2M_USERNAME: string;
      C2M_PASSWORD: string;

      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_S3_BUCKET: string;

      ELASTICSEARCH_NODE: string;
      ELASTICSEARCH_USERNAME: string;
      ELASTICSEARCH_PASSWORD: string;
    }
  }
}

export {};
