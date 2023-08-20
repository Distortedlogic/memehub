import { EAiProvider } from '../enums/EAiProvider';
import { TAiModel, TAnthropicModel, TOpenAiModel } from '../types/TAiModels';

const pricesJson: {
  [EAiProvider.OpenAi]: Record<TOpenAiModel, number>;
  [EAiProvider.Anthropic]: Record<TAnthropicModel, number>;
} = {
  [EAiProvider.OpenAi]: {
    'gpt-3.5-turbo': 1.5,
  },
  [EAiProvider.Anthropic]: {
    'claude-v1': 11.02,
  },
};

export const getPricePerMillionToken = (provider: EAiProvider, model: TAiModel) => {
  const price: number | undefined = (pricesJson as any)[provider][model];
  if (!price) throw new Error('bad usage');
  return price;
};

export const getAiCost = (tokenCount: number, provider: EAiProvider, model: TAiModel) => {
  const price: number | undefined = (pricesJson as any)[provider][model];
  if (!price) throw new Error('bad usage');
  return (tokenCount * price) / 1_000_000;
};
