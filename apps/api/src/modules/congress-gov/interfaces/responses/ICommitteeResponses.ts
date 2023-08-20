import { ICommonCommitteeData } from './ICommonResponses';

interface BillData {
  number: string;
  type: string;
}
export interface IGetCommitteeReportDetailsResponse {
  title: string;
  associatedBill: BillData[];
  committees: ICommonCommitteeData[];
}

export interface IGetCommitteeMeetingDetailsResponse {
  title: string;
  committees: ICommonCommitteeData[];
}

export interface IGetCommitteePrintDetailsResponse {
  title: string;
  associatedBills: BillData[];
  committees: ICommonCommitteeData[];
}
