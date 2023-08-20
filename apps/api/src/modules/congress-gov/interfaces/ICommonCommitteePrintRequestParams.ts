import { ICommonResQParams } from './ICommonResQParams';

export interface ICommonCommitteePrintRequestParams extends ICommonResQParams {
  congress: number;
  chamber: string;
  jacketNumber: number;
}
