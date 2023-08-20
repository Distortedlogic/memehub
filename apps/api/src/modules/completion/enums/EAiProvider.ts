import { registerEnumType } from '@nestjs/graphql';

export enum EAiProvider {
  OpenAi = 'open_ai',
  Anthropic = 'anthropic',
}

registerEnumType(EAiProvider, { name: 'EAiProvider' });
