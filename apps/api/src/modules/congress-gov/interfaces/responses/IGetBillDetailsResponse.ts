import { BillSourceSystemData } from '../../entities/bill/bill-action.entity';
import { ICommonSponsorData } from './ICommonResponses';

export interface IGetBillDetailsResponse {
  title: string;
  introducedDate: string;
  sponsors: ICommonSponsorData[];
}

export interface IGetBillActionsRespons {
  actionCode: string;
  actionDate: string;
  text: string;
  type: string;
  sourceSystem: BillSourceSystemData;
}

export interface ICommonCommitteeData {
  systemCode: string;
  name: string;
}
