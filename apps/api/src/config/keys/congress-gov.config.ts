import { registerAs } from '@nestjs/config';

export interface ICongressGovEnvironment {
  congressGovKey: string;
}

export const congressGovEnvironment = registerAs(
  'congressGovEnvironment',
  (): ICongressGovEnvironment => ({
    congressGovKey: process.env.CONGRESS_GOV_KEY,
  }),
);
