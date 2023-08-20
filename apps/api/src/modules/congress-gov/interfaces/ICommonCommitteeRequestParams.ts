import { ICommonResQParams } from './ICommonResQParams';

export interface ICommonCommitteeRequestParams extends ICommonResQParams {
  chamber: string;
  committeeCode: string;
}
