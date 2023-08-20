import { ICommonResQParams } from './ICommonResQParams';

export interface ICommonCommitteeMeetingRequestParams extends ICommonResQParams {
  congress: number;
  chamber: string;
  eventId: string;
}
