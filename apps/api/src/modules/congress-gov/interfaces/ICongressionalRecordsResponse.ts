import { CongressionalRecordEntity } from '../entities/congressional-records.entity';

export interface ICongressionalRecordsResponse {
  IndexStart: number;
  Issues: CongressionalRecordEntity[];
}
