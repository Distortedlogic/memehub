import { registerEnumType } from '@nestjs/graphql';

export enum EPromptType {
  StrategyProposal = 'StrategyProposal',
  ContributionOptimiser = 'ContributionOptimiser',
  IdentifyKeyStakeholders = 'IdentifyKeyStakeholders',
  LegislationImpactAssessment = 'LegislationImpactAssessment',
  SummariseLegislation = 'SummariseLegislation',
  PetitionCongressMembers = 'PetitionCongressMembers',
  WriteClientUpdate = 'WriteClientUpdate',
  TalkingPointsPro = 'TalkingPointsPro',
  TalkingPointsCon = 'TalkingPointsCon',
  PitchJournalist = 'PitchJournalist',
}
registerEnumType(EPromptType, { name: 'EPromptType' });
