import { registerAs } from '@nestjs/config';

export interface IClick2mailEnvironment {
  username: string;
  password: string;
}

export const click2mailEnvironment = registerAs(
  'click2mailEnvironment',
  (): IClick2mailEnvironment => ({
    username: process.env.C2M_USERNAME,
    password: process.env.C2M_PASSWORD,
  }),
);
