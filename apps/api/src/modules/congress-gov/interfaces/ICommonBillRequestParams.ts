import { ICommonResQParams } from './ICommonResQParams';

export interface ICommonBillRequestParams extends ICommonResQParams {
  congress: number;
  billType: string;
  billNumber: string;
}
