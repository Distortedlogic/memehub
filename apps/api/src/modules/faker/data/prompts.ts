import { EPromptCategory } from '../../prompt/enums/EPromptCategory';

export const promptData = [
  {
    name: 'Strategy Proposal',
    category: EPromptCategory.Strategy,
    description: 'Generate A strategy proposal for your client',
    value:
      'Acting as an expert in federal lobbying and government relations, ' +
      'write a detailed email that proposes a comprehensive lobbying strategy to the following client. ' +
      'The firm you work for is ${firmName}. ' +
      'Your name is ${firstName} ${lastName}. ' +
      "The client's name is ${clientName}. " +
      "The client's description is ${clientDescription}. " +
      "The client's objective is ${clientObjective}. ",
  },
  {
    name: 'Contribution Optimiser',
    category: EPromptCategory.Strategy,
    description: '',
    value: '',
  },
  {
    name: 'Indentify Key Stakeholders Optimiser',
    category: EPromptCategory.Engagement,
    description: '',
    value: '',
  },
  {
    name: 'Petition Congress Members',
    category: EPromptCategory.Engagement,
    description: '',
    value: '',
  },
  {
    name: 'Legislation Impact Assessment',
    category: EPromptCategory.Legislation,
    description: '',
    value: '',
  },
  {
    name: 'Summarize Legislation',
    category: EPromptCategory.Legislation,
    description: '',
    value:
      'Acting as an expert in federal legislation and lobbying, ' +
      'provide a detailed analysis of how the following legislation might affect the following lobbying client, if at all. ' +
      "The client's name is ${clientName}. " +
      "The client's description is ${clientDescription}. " +
      "The client's objective is ${clientObjective}. ",
  },
  {
    name: 'Talking Points in Support',
    category: EPromptCategory.Legislation,
    description: '',
    value: '',
  },
  {
    name: 'Talking Points in Against',
    category: EPromptCategory.Legislation,
    description: '',
    value: '',
  },
  {
    name: 'Pitch a Journalist',
    category: EPromptCategory.PR,
    description: '',
    value: '',
  },
];
