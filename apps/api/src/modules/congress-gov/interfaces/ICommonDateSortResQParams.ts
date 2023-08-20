import { ICommonDateResQParams } from './ICommonDateResQParams';

export interface ICommonDateSortResQParams extends ICommonDateResQParams {
  format: 'xml' | 'json';
  offset?: number;
  limit?: number; // max 250
  fromDateTime?: string; //Use format: YYYY-MM-DDT00:00:00Z.
  toDateTime?: string;
  sort?: 'updateDate+asc' | 'updateDate+desc';
}
