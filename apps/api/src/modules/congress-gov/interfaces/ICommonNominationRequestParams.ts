import { ICommonResQParams } from './ICommonResQParams';

export interface ICommonNominationRequestParams extends ICommonResQParams {
  congress: number;
  nominationNumber: number;
}
