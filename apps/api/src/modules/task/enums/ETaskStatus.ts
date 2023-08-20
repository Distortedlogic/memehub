import { registerEnumType } from '@nestjs/graphql';

export enum ETaskStatus {
  ToDo = 'ToDo',
  InProgress = 'InProgress',
  Completed = 'Completed',
}
registerEnumType(ETaskStatus, { name: 'ETaskStatus' });
