export type TOpenAiModel = 'gpt-3.5-turbo';
export type TAnthropicModel = 'claude-v1';

export type TAiModel = TOpenAiModel | TAnthropicModel;

export const aiModelValues: TAiModel[] = ['gpt-3.5-turbo', 'claude-v1'];
