import { ICommonResQParams } from './ICommonResQParams';

export interface ICommonAmendmentRequestParams extends ICommonResQParams {
  congress: number;
  amendmentType: string;
  amendmentNumber: string;
}
