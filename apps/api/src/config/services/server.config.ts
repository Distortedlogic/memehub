import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { registerAs } from '@nestjs/config';
import { SessionOptions } from 'express-session';
import Url from 'url-parse';

export interface IServerEnvironment {
  protocol: string;
  host: string;
  port: number;
  isLocal: boolean;
  isDev: boolean;
  isStaging: boolean;
  isProd: boolean;
  secret: string;
  frontendUrl: string;
  corsOptions: CorsOptions;
  sessionOptions: SessionOptions;
}

const envToCookieOptions = (env: string) => {
  switch (env) {
    case 'local':
      return { domain: 'localhost', secure: false };
    case 'dev':
      return { domain: '.dev.lobbymatic.com', secure: true };
    case 'staging':
      return { domain: '.staging.lobbymatic.com', secure: true };
    case 'prod':
      return { domain: 'lobbymatic.com', secure: true };

    default:
      throw new Error('exhausted ENV');
  }
};

export const serverEnvironment = registerAs('serverEnvironment', (): IServerEnvironment => {
  const isLocal = process.env.ENV === 'local';
  const isDev = process.env.ENV === 'dev';
  const isStaging = process.env.ENV === 'staging';
  const isProd = process.env.ENV === 'prod';
  const protocol = isLocal ? 'http' : 'https';
  const host = process.env.BACKEND_HOST;
  const originWhitelist = JSON.parse(process.env.ORIGIN_WHITE_LIST);
  const secret = process.env.SECRET;
  const port = Number(process.env.BACKEND_PORT) || 5000;
  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      return callback(null, true);
      if (typeof origin === 'undefined') return callback(null, true);
      const url = new Url(origin);
      if (originWhitelist.includes(url.hostname)) return callback(null, true);
      return callback(
        new Error(
          `who do you think you are? origin: ${origin}, url: ${url}, originWhitelist: ${originWhitelist}, url.hostname:${url.hostname}`,
        ),
      );
    },
    credentials: true,
  };
  const sessionOptions: SessionOptions = {
    name: 'speedCowOwen',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'strict',
      ...envToCookieOptions(process.env.ENV),
    },
    secret,
    resave: false,
    saveUninitialized: false,
  };
  return {
    protocol,
    host,
    port,
    isLocal,
    isDev,
    isStaging,
    isProd,
    secret,
    frontendUrl: process.env.FRONTEND_URL,
    corsOptions,
    sessionOptions,
  };
});
