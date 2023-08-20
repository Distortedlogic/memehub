import { ICommonCommitteeData } from './ICommonResponses';

interface NomineeData {
  introText: string;
  ordinal: number;
  organization: string;
  positionTitle: string;
  url: string;
}
export interface IGetNominationDetailsResponse {
  nominees: NomineeData[];
}

export interface IGetNominationActionsResponse {
  actionCode: string;
  actionDate: string;
  text: string;
  type: string;
  committee: ICommonCommitteeData[];
}
