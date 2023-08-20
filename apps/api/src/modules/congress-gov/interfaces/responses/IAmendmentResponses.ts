import { AmendmentSourceSystemData, RecordedVotesData } from '../../entities/amendment/amendment-action.entity';
import { AmendmentBillData } from '../../entities/amendment/amendment.entity';
import { ICommonSponsorData } from './ICommonResponses';

export interface IGetAmendmentDetailsResponse {
  amendedBill: AmendmentBillData;
  updateDate: string;
  sponsors: ICommonSponsorData[];
}

export interface IGetAmendmentActionsResponse {
  recordedVotes: RecordedVotesData[];
  actionDate: string;
  text: string;
  type: string;
  sourceSystem: AmendmentSourceSystemData[];
}
