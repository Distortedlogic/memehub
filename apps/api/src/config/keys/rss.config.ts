import { registerAs } from '@nestjs/config';

export interface IRssEnvironment {
  rssKey: string;
}

export const rssEnvironment = registerAs(
  'rssEnvironment',
  (): IRssEnvironment => ({
    rssKey: process.env.RSS_KEY,
  }),
);
