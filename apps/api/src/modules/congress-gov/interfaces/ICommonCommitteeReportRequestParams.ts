import { ICommonResQParams } from './ICommonResQParams';

export interface ICommonCommitteeReportRequestParams extends ICommonResQParams {
  congress: number;
  reportType: string;
  reportNumber: number;
}
