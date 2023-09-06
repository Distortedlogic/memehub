import { registerEnumType } from '@nestjs/graphql';

export enum EQueueRegistry {}
registerEnumType(EQueueRegistry, { name: 'EQueueRegistry' });
