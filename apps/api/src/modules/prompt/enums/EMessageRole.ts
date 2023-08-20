import { registerEnumType } from '@nestjs/graphql';

export enum EMessageRole {
  system = 'system',
  user = 'user',
  assistant = 'assistant',
}
registerEnumType(EMessageRole, { name: 'EMessageRole' });
