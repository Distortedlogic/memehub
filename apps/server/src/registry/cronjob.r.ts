import { registerEnumType } from '@nestjs/graphql';

export enum ECronJobRegistry {}
registerEnumType(ECronJobRegistry, { name: 'ECronJobRegistry' });

export const CRON_SCHEDULES = {};
