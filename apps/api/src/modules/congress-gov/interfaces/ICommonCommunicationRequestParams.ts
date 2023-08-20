import { ICommonResQParams } from './ICommonResQParams';

export interface ICommonCommunicationRequestParams extends ICommonResQParams {
  congress: number;
  communicationType: string;
  communicationNumber: number;
}
