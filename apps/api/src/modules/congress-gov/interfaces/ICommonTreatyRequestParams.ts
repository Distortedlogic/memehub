import { ICommonResQParams } from './ICommonResQParams';

export interface ICommonTreatyRequestParams extends ICommonResQParams {
  congress: number;
  treatyNumber: number;
}
