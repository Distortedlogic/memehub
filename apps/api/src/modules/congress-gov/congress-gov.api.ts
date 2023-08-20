import { HttpService } from '@nestjs/axios';
import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';
import { congressGovEnvironment } from '../../config/keys/congress-gov.config';
import { AmendmentEntity } from './entities/amendment/amendment.entity';
import { BillEntity } from './entities/bill/bill.entity';
import { CongressCommitteeMeetingEntity } from './entities/committee/committee-meeting.entity';
import { CongressCommitteePrintEntity } from './entities/committee/committee-print.entity';
import { CongressCommitteeReportEntity } from './entities/committee/committee-report.entity';
import { CommitteeEntity } from './entities/committee/committee.entity';
import { CongressHouseCommunicationEntity } from './entities/communication/house-communication.entity';
import { CongressSenateCommunicationEntity } from './entities/communication/senate-communication.entity';
import { CongressMemberEntity } from './entities/congress-member.entity';
import { CongressHearingEntity } from './entities/hearing.entity';
import { CongressHouseRequirementEntity } from './entities/house-requirement.entity';
import { CongressNominationEntity } from './entities/nomination/nomination.entity';
import { CongressSummaryEntity } from './entities/summary.entity';
import { CongressTreatyEntity } from './entities/treaty/treaty.entity';
import { ICommonAmendmentRequestParams } from './interfaces/ICommonAmendmentRequestParams';
import { ICommonBillRequestParams } from './interfaces/ICommonBillRequestParams';
import { ICommonCommitteeMeetingRequestParams } from './interfaces/ICommonCommitteeMeetingRequestParams';
import { ICommonCommitteePrintRequestParams } from './interfaces/ICommonCommitteePrintRequestParams';
import { ICommonCommitteeReportRequestParams } from './interfaces/ICommonCommitteeReportRequestParams';
import { ICommonCommunicationRequestParams } from './interfaces/ICommonCommunicationRequestParams';
import { ICommonDateSortResQParams } from './interfaces/ICommonDateSortResQParams';
import { ICommonNominationRequestParams } from './interfaces/ICommonNominationRequestParams';
import { ICommonResQParams } from './interfaces/ICommonResQParams';
import { ICommonTreatyRequestParams } from './interfaces/ICommonTreatyRequestParams';
import { ICongressionalRecordsResponse } from './interfaces/ICongressionalRecordsResponse';
import { IGetAmendmentActionsResponse, IGetAmendmentDetailsResponse } from './interfaces/responses/IAmendmentResponses';
import {
  IGetCommitteeMeetingDetailsResponse,
  IGetCommitteePrintDetailsResponse,
  IGetCommitteeReportDetailsResponse,
} from './interfaces/responses/ICommitteeResponses';
import { ICommonSponsorData } from './interfaces/responses/ICommonResponses';
import {
  IGetHouseCommunicationDetailsResponse,
  IGetSenateCommunicationDetailsResponse,
} from './interfaces/responses/ICommunicationResponses';
import { ICommonCommitteeData, IGetBillActionsRespons, IGetBillDetailsResponse } from './interfaces/responses/IGetBillDetailsResponse';
import { IGetNominationActionsResponse, IGetNominationDetailsResponse } from './interfaces/responses/INominationResponses';
import { IGetTreatyActionsResponse } from './interfaces/responses/ITreatyResponses';

//docs
// https://gpo.congress.gov/#/bill

@Injectable()
export class CongressGovApi {
  private readonly logger = new Logger(CongressGovApi.name);
  constructor(
    @Inject(congressGovEnvironment.KEY)
    private readonly congressGovEnv: ConfigType<typeof congressGovEnvironment>,
    private httpService: HttpService,
  ) {}

  getBills(params: ICommonDateSortResQParams) {
    return lastValueFrom(
      this.httpService.get<{ bills: BillEntity[] }>('/bill', { params: { ...params, api_key: this.congressGovEnv.congressGovKey } }).pipe(
        map((resp) => resp.data.bills),
        catchError((e) => {
          this.logger.error(e);
          throw new HttpException(e.response.data, e.response.status);
        }),
      ),
    );
  }

  getAmendments(params: ICommonResQParams) {
    return lastValueFrom(
      this.httpService
        .get<{ amendments: AmendmentEntity[] }>('/amendment', {
          params: { ...params, api_key: this.congressGovEnv.congressGovKey },
        })
        .pipe(
          map((resp) => resp.data.amendments),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getMembers(params: ICommonResQParams) {
    return lastValueFrom(
      this.httpService
        .get<{ members: CongressMemberEntity[] }>('/member', {
          params: { ...params, api_key: this.congressGovEnv.congressGovKey },
        })
        .pipe(
          map((resp) => resp.data.members),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getCommittees(params: ICommonResQParams) {
    return lastValueFrom(
      this.httpService
        .get<{ committees: CommitteeEntity[] }>('/committee', {
          params: { ...params, api_key: this.congressGovEnv.congressGovKey },
        })
        .pipe(
          map((resp) => resp.data.committees),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getCongress(params: ICommonResQParams) {
    return lastValueFrom(
      this.httpService
        .get<{ congresses: any }>('/congress', {
          params: { ...params, api_key: this.congressGovEnv.congressGovKey },
        })
        .pipe(
          map((resp) => resp.data.congresses),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getSummeries(params: ICommonResQParams) {
    return lastValueFrom(
      this.httpService
        .get<{ summaries: CongressSummaryEntity[] }>('/summaries', {
          params: { ...params, api_key: this.congressGovEnv.congressGovKey },
        })
        .pipe(
          map((resp) => resp.data.summaries),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getCommitteeReports(params: ICommonResQParams) {
    return lastValueFrom(
      this.httpService
        .get<{ reports: CongressCommitteeReportEntity[] }>('/committee-report', {
          params: { ...params, api_key: this.congressGovEnv.congressGovKey },
        })
        .pipe(
          map((resp) => resp.data.reports),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getCommitteePrints(params: ICommonResQParams) {
    return lastValueFrom(
      this.httpService
        .get<{ committeePrints: CongressCommitteePrintEntity[] }>('/committee-print', {
          params: { ...params, api_key: this.congressGovEnv.congressGovKey },
        })
        .pipe(
          map((resp) => resp.data.committeePrints),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getCommitteeMeeting(params: ICommonResQParams) {
    return lastValueFrom(
      this.httpService
        .get<{ committeeMeetings: CongressCommitteeMeetingEntity[] }>('/committee-meeting', {
          params: { ...params, api_key: this.congressGovEnv.congressGovKey },
        })
        .pipe(
          map((resp) => resp.data.committeeMeetings),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getNominations(params: ICommonResQParams) {
    return lastValueFrom(
      this.httpService
        .get<{ nominations: CongressNominationEntity[] }>('/nomination', {
          params: { ...params, api_key: this.congressGovEnv.congressGovKey },
        })
        .pipe(
          map((resp) => resp.data.nominations),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getTreaty(params: ICommonResQParams) {
    return lastValueFrom(
      this.httpService
        .get<{ treaties: CongressTreatyEntity[] }>('/treaty', {
          params: { ...params, api_key: this.congressGovEnv.congressGovKey },
        })
        .pipe(
          map((resp) => resp.data.treaties),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getCongressionalRecords(params: ICommonResQParams) {
    return lastValueFrom(
      this.httpService
        .get<{ Results: ICongressionalRecordsResponse }>('/congressional-record', {
          params: { ...params, api_key: this.congressGovEnv.congressGovKey },
        })
        .pipe(
          map((resp) => resp.data.Results.Issues),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getHouseCommunications(params: ICommonResQParams) {
    return lastValueFrom(
      this.httpService
        .get<{ houseCommunications: CongressHouseCommunicationEntity[] }>('/house-communication', {
          params: { ...params, api_key: this.congressGovEnv.congressGovKey },
        })
        .pipe(
          map((resp) => resp.data.houseCommunications),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getSenateCommunications(params: ICommonResQParams) {
    return lastValueFrom(
      this.httpService
        .get<{ senateCommunications: CongressSenateCommunicationEntity[] }>('/senate-communication', {
          params: { ...params, api_key: this.congressGovEnv.congressGovKey },
        })
        .pipe(
          map((resp) => resp.data.senateCommunications),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getHearings(params: ICommonResQParams) {
    return lastValueFrom(
      this.httpService
        .get<{ hearings: CongressHearingEntity[] }>('/hearing', {
          params: { ...params, api_key: this.congressGovEnv.congressGovKey },
        })
        .pipe(
          map((resp) => resp.data.hearings),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getHouseRequirements(params: ICommonResQParams) {
    return lastValueFrom(
      this.httpService
        .get<{ houseRequirements: CongressHouseRequirementEntity[] }>('/house-requirement', {
          params: { ...params, api_key: this.congressGovEnv.congressGovKey },
        })
        .pipe(
          map((resp) => resp.data.houseRequirements),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getBillDetails(params: ICommonBillRequestParams) {
    return lastValueFrom(
      this.httpService
        .get<{ bill: IGetBillDetailsResponse }>(`bill/${params.congress}/${params.billType}/${params.billNumber}`, {
          params: { api_key: this.congressGovEnv.congressGovKey, format: params.format },
        })
        .pipe(
          map((resp) => resp.data.bill),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getBillActions(params: ICommonBillRequestParams) {
    return lastValueFrom(
      this.httpService
        .get<{ actions: IGetBillActionsRespons[] }>(`bill/${params.congress}/${params.billType}/${params.billNumber}/actions`, {
          params: { api_key: this.congressGovEnv.congressGovKey, format: params.format, offset: params.offset, limit: params.limit },
        })
        .pipe(
          map((resp) => resp.data.actions),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getBillCosponsors(params: ICommonBillRequestParams) {
    return lastValueFrom(
      this.httpService
        .get<{ cosponsors: ICommonSponsorData[] }>(`bill/${params.congress}/${params.billType}/${params.billNumber}/cosponsors`, {
          params: { api_key: this.congressGovEnv.congressGovKey, format: params.format, offset: params.offset, limit: params.limit },
        })
        .pipe(
          map((resp) => resp.data.cosponsors),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getBillSummaries(params: ICommonBillRequestParams) {
    return lastValueFrom(
      this.httpService
        .get(`bill/${params.congress}/${params.billType}/${params.billNumber}/summaries`, {
          params: { api_key: this.congressGovEnv.congressGovKey, format: params.format, offset: params.offset, limit: params.limit },
        })
        .pipe(
          map((resp) => resp.data.summaries),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getBillCommittee(params: ICommonBillRequestParams) {
    return lastValueFrom(
      this.httpService
        .get<{ committees: ICommonCommitteeData[] }>(`bill/${params.congress}/${params.billType}/${params.billNumber}/committees`, {
          params: { api_key: this.congressGovEnv.congressGovKey, format: params.format, offset: params.offset, limit: params.limit },
        })
        .pipe(
          map((resp) => resp.data.committees),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }
  // amendments apis
  getAmendmentDetails(params: ICommonAmendmentRequestParams) {
    return lastValueFrom(
      this.httpService
        .get<{ amendment: IGetAmendmentDetailsResponse }>(
          `amendment/${params.congress}/${params.amendmentType}/${params.amendmentNumber}`,
          {
            params: { api_key: this.congressGovEnv.congressGovKey, format: params.format },
          },
        )
        .pipe(
          map((resp) => resp.data.amendment),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getAmendmentCosponsors(params: ICommonAmendmentRequestParams) {
    return lastValueFrom(
      this.httpService
        .get<{ cosponsors: ICommonSponsorData[] }>(
          `amendment/${params.congress}/${params.amendmentType}/${params.amendmentNumber}/cosponsors`,
          {
            params: { api_key: this.congressGovEnv.congressGovKey, format: params.format, offset: params.offset, limit: params.limit },
          },
        )
        .pipe(
          map((resp) => resp.data.cosponsors),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getAmendmentActions(params: ICommonAmendmentRequestParams) {
    return lastValueFrom(
      this.httpService
        .get<{ actions: IGetAmendmentActionsResponse[] }>(
          `amendment/${params.congress}/${params.amendmentType}/${params.amendmentNumber}/actions`,
          {
            params: { api_key: this.congressGovEnv.congressGovKey, format: params.format, offset: params.offset, limit: params.limit },
          },
        )
        .pipe(
          map((resp) => resp.data.actions),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }
  // nomination apis
  getNominationDetails(params: ICommonNominationRequestParams) {
    return lastValueFrom(
      this.httpService
        .get<{ nomination: IGetNominationDetailsResponse }>(`nomination/${params.congress}/${params.nominationNumber}`, {
          params: { api_key: this.congressGovEnv.congressGovKey, format: params.format },
        })
        .pipe(
          map((resp) => resp.data.nomination),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getNominationCommittees(params: ICommonNominationRequestParams) {
    return lastValueFrom(
      this.httpService
        .get<{ committees: ICommonCommitteeData[] }>(`nomination/${params.congress}/${params.nominationNumber}/committees`, {
          params: { api_key: this.congressGovEnv.congressGovKey, format: params.format, offset: params.offset, limit: params.limit },
        })
        .pipe(
          map((resp) => resp.data.committees),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getNominationActions(params: ICommonNominationRequestParams) {
    return lastValueFrom(
      this.httpService
        .get<{ actions: IGetNominationActionsResponse[] }>(`nomination/${params.congress}/${params.nominationNumber}/actions`, {
          params: { api_key: this.congressGovEnv.congressGovKey, format: params.format, offset: params.offset, limit: params.limit },
        })
        .pipe(
          map((resp) => resp.data.actions),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }
  // treaty apis
  getTreatyDetails(params: ICommonTreatyRequestParams) {
    return lastValueFrom(
      this.httpService
        .get<{ treaty: [] }>(`treaty/${params.congress}/${params.treatyNumber}`, {
          params: { api_key: this.congressGovEnv.congressGovKey, format: params.format },
        })
        .pipe(
          map((resp) => resp.data.treaty),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getTreatyCommittees(params: ICommonTreatyRequestParams) {
    return lastValueFrom(
      this.httpService
        .get<{ treatyCommittees: [] }>(`treaty/${params.congress}/${params.treatyNumber}/committees`, {
          params: { api_key: this.congressGovEnv.congressGovKey, format: params.format, offset: params.format, limit: params.limit },
        })
        .pipe(
          map((resp) => resp.data.treatyCommittees),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getTreatyActions(params: ICommonTreatyRequestParams) {
    return lastValueFrom(
      this.httpService
        .get<{ actions: IGetTreatyActionsResponse[] }>(`treaty/${params.congress}/${params.treatyNumber}/actions`, {
          params: { api_key: this.congressGovEnv.congressGovKey, format: params.format, offset: params.offset, limit: params.limit },
        })
        .pipe(
          map((resp) => resp.data.actions),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }
  // committee report apis
  getCommitteeReportDetails(params: ICommonCommitteeReportRequestParams) {
    return lastValueFrom(
      this.httpService
        .get<{ committeeReports: IGetCommitteeReportDetailsResponse[] }>(
          `committee-report/${params.congress}/${params.reportType}/${params.reportNumber}`,
          {
            params: { api_key: this.congressGovEnv.congressGovKey, format: params.format },
          },
        )
        .pipe(
          map((resp) => resp.data.committeeReports),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getCommitteeMeetingDetails(params: ICommonCommitteeMeetingRequestParams) {
    return lastValueFrom(
      this.httpService
        .get<{ committeeMeeting: IGetCommitteeMeetingDetailsResponse }>(
          `committee-meeting/${params.congress}/${params.chamber}/${params.eventId}`,
          {
            params: { api_key: this.congressGovEnv.congressGovKey, format: params.format },
          },
        )
        .pipe(
          map((resp) => resp.data.committeeMeeting),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getCommitteePrintDetails(params: ICommonCommitteePrintRequestParams) {
    return lastValueFrom(
      this.httpService
        .get<{ committeePrint: IGetCommitteePrintDetailsResponse[] }>(
          `committee-print/${params.congress}/${params.chamber}/${params.jacketNumber}`,
          {
            params: { api_key: this.congressGovEnv.congressGovKey, format: params.format },
          },
        )
        .pipe(
          map((resp) => resp.data.committeePrint),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getHouseCommunicationDetails(params: ICommonCommunicationRequestParams) {
    return lastValueFrom(
      this.httpService
        .get<{ houseCommunication: IGetHouseCommunicationDetailsResponse }>(
          `house-communication/${params.congress}/${params.communicationType}/${params.communicationNumber}`,
          {
            params: { api_key: this.congressGovEnv.congressGovKey, format: params.format },
          },
        )
        .pipe(
          map((resp) => resp.data.houseCommunication),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getSenateCommunicationDetails(params: ICommonCommunicationRequestParams) {
    return lastValueFrom(
      this.httpService
        .get<{ senateCommunication: IGetSenateCommunicationDetailsResponse }>(
          `senate-communication/${params.congress}/${params.communicationType}/${params.communicationNumber}`,
          {
            params: { api_key: this.congressGovEnv.congressGovKey, format: params.format },
          },
        )
        .pipe(
          map((resp) => resp.data.senateCommunication),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }
}
