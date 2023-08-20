import { ICommonResQParams } from './ICommonResQParams';

export interface ICommonDateResQParams extends ICommonResQParams {
  fromDateTime?: string; //Use format: YYYY-MM-DDT00:00:00Z.
  toDateTime?: string;
}
