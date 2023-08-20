import { registerEnumType } from '@nestjs/graphql';

export enum EPromptCategory {
  Strategy = 'Strategy',
  Engagement = 'Engagement',
  Legislation = 'Legislation',
  Client = 'Client',
  PR = 'PR',
}
registerEnumType(EPromptCategory, { name: 'EPromptCategory' });
