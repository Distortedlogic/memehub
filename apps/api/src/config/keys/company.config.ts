import { registerAs } from '@nestjs/config';

export interface ICompanyEnvironment {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export const companyEnvironment = registerAs(
  'companyEnvironment',
  (): ICompanyEnvironment => ({
    name: 'Awesome User',
    address: '221B Baker St',
    city: 'Springfield',
    state: 'MO',
    zip: '34567',
  }),
);
