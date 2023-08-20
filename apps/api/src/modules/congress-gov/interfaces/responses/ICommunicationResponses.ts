export interface CommunicationCommitteeData {
  systemCode: string;
  referralDate: string;
  name: string;
}
export interface IGetHouseCommunicationDetailsResponse {
  abstract: string;
  committees: CommunicationCommitteeData[];
}

export interface IGetSenateCommunicationDetailsResponse {
  abstract: string;
  committees: CommunicationCommitteeData[];
}
