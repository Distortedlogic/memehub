import { registerAs } from '@nestjs/config';

export interface IOpenaiEnvironment {
  openaiKey: string;
}

export const openaiEnvironment = registerAs(
  'openaiEnvironment',
  (): IOpenaiEnvironment => ({
    openaiKey: process.env.OPENAI_KEY,
  }),
);
