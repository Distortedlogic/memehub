import { registerAs } from '@nestjs/config';

export interface ICardEnvironment {
  number: string;
  month: string;
  year: string;
  cvv: string;
  ccType: string;
}

export const cardEnvironment = registerAs(
  'cardEnvironment',
  (): ICardEnvironment => ({
    number: '4111111111111111',
    month: '12',
    year: '30',
    cvv: '123',
    ccType: 'VI',
  }),
);
