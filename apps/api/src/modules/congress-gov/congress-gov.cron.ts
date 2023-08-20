import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { In, Repository } from 'typeorm';
import { CongressGovApi } from './congress-gov.api';
import { AmendmentActionEntity } from './entities/amendment/amendment-action.entity';
import { AmendmentCosponsorEntity } from './entities/amendment/amendment-cosponsor.entity';
import { AmendmentSponsorEntity } from './entities/amendment/amendment-sponsor.entity';
import { AmendmentEntity } from './entities/amendment/amendment.entity';
import { BillActionsEntity } from './entities/bill/bill-action.entity';
import { BillCommitteeEntity } from './entities/bill/bill-committee.entity';
import { BillCosponsorEntity } from './entities/bill/bill-cosponsor.entity';
import { BillSponsorEntity } from './entities/bill/bill-sponsor.entity';
import { BillEntity } from './entities/bill/bill.entity';
import { CommitteeCommitteeMeetingEntity } from './entities/committee/committee-committee-meeting.entity';
import { CommitteeCommitteePrintEntity } from './entities/committee/committee-committee-print.entity';
import { CommitteeCommitteeReportEntity } from './entities/committee/committee-committee-report.entity';
import { CongressCommitteeMeetingEntity } from './entities/committee/committee-meeting.entity';
import { CommitteePrintBillEntity } from './entities/committee/committee-print-bills.entity';
import { CongressCommitteePrintEntity } from './entities/committee/committee-print.entity';
import { CommitteeReportBillEntity } from './entities/committee/committee-report-bills.entity';
import { CongressCommitteeReportEntity } from './entities/committee/committee-report.entity';
import { CommitteeEntity } from './entities/committee/committee.entity';
import { HouseCommunicationCommitteeEntity } from './entities/communication/house-communication-committee.entity';
import { CongressHouseCommunicationEntity } from './entities/communication/house-communication.entity';
import { SenateCommunicationCommitteeEntity } from './entities/communication/senate-communication-committee.entity';
import { CongressSenateCommunicationEntity } from './entities/communication/senate-communication.entity';
import { CongressMemberEntity } from './entities/congress-member.entity';
import { CongressionalRecordEntity } from './entities/congressional-records.entity';
import { CongressHearingEntity } from './entities/hearing.entity';
import { CongressHouseRequirementEntity } from './entities/house-requirement.entity';
import { NominationActionEntity } from './entities/nomination/nomination-action.entity';
import { NominationCommitteeEntity } from './entities/nomination/nomination-committee.entity';
import { CongressNominationEntity } from './entities/nomination/nomination.entity';
import { CongressSummaryEntity } from './entities/summary.entity';
import { TreatyActionEntity } from './entities/treaty/treaty-action.entity';
import { CongressTreatyEntity } from './entities/treaty/treaty.entity';
import { ICommonAmendmentRequestParams } from './interfaces/ICommonAmendmentRequestParams';
import { ICommonBillRequestParams } from './interfaces/ICommonBillRequestParams';
import { ICommonCommitteeMeetingRequestParams } from './interfaces/ICommonCommitteeMeetingRequestParams';
import { ICommonCommitteePrintRequestParams } from './interfaces/ICommonCommitteePrintRequestParams';
import { ICommonCommitteeReportRequestParams } from './interfaces/ICommonCommitteeReportRequestParams';
import { ICommonCommunicationRequestParams } from './interfaces/ICommonCommunicationRequestParams';
import { ICommonNominationRequestParams } from './interfaces/ICommonNominationRequestParams';
import { ICommonTreatyRequestParams } from './interfaces/ICommonTreatyRequestParams';

dayjs.extend(utc);

@Injectable()
export class CongressGovCron {
  constructor(
    private readonly api: CongressGovApi,
    @InjectRepository(BillEntity)
    private readonly billRepo: Repository<BillEntity>,
    @InjectRepository(CongressMemberEntity)
    private readonly congressMemberRepo: Repository<CongressMemberEntity>, // @InjectRepository(CommitteeEntity) // private readonly committeeRepo: Repository<CommitteeEntity>, // @InjectRepository(SponsoredLegislationEntity) // private readonly sponsoredLegislationRepo: Repository<SponsoredLegislationEntity>,
    @InjectRepository(AmendmentEntity)
    private readonly congressAmedmentsRepo: Repository<AmendmentEntity>,
    @InjectRepository(CommitteeEntity)
    private readonly committeeRepo: Repository<CommitteeEntity>,
    @InjectRepository(CongressSummaryEntity)
    private readonly summaryRepo: Repository<CongressSummaryEntity>,
    @InjectRepository(CongressNominationEntity)
    private readonly nominationRepo: Repository<CongressNominationEntity>,
    @InjectRepository(CongressTreatyEntity)
    private readonly treatyRepo: Repository<CongressTreatyEntity>,
    @InjectRepository(CongressSenateCommunicationEntity)
    private readonly senateCommunicationRepo: Repository<CongressSenateCommunicationEntity>,
    @InjectRepository(CongressHouseCommunicationEntity)
    private readonly houseCommunicationRepo: Repository<CongressHouseCommunicationEntity>,
    @InjectRepository(CongressCommitteeReportEntity)
    private readonly committeeReportRepo: Repository<CongressCommitteeReportEntity>,
    @InjectRepository(CongressCommitteePrintEntity)
    private readonly committeePrintRepo: Repository<CongressCommitteePrintEntity>,
    @InjectRepository(CongressCommitteeMeetingEntity)
    private readonly committeeMeetingRepo: Repository<CongressCommitteeMeetingEntity>,
    @InjectRepository(CongressionalRecordEntity)
    private readonly congressionalRecordRepo: Repository<CongressionalRecordEntity>,
    @InjectRepository(CongressHearingEntity)
    private readonly hearingRepo: Repository<CongressHearingEntity>,
    @InjectRepository(CongressHouseRequirementEntity)
    private readonly houseRequirementRepo: Repository<CongressHouseRequirementEntity>,
    @InjectRepository(BillActionsEntity)
    private readonly billActionRepo: Repository<BillActionsEntity>,
    @InjectRepository(BillCommitteeEntity)
    private readonly billCommitteeRepo: Repository<BillCommitteeEntity>,
    @InjectRepository(BillCosponsorEntity)
    private readonly billCosponsorRepo: Repository<BillCosponsorEntity>,
    @InjectRepository(BillSponsorEntity)
    private readonly billSponsorRepo: Repository<BillSponsorEntity>,
    @InjectRepository(CommitteeReportBillEntity)
    private readonly committeeReportBillRepo: Repository<CommitteeReportBillEntity>,
    @InjectRepository(CommitteeCommitteeMeetingEntity)
    private readonly committeeCommitteeMeetingRepo: Repository<CommitteeCommitteeMeetingEntity>,
    @InjectRepository(CommitteeCommitteePrintEntity)
    private readonly committeeCommitteePrintRepo: Repository<CommitteeCommitteePrintEntity>,
    @InjectRepository(CommitteePrintBillEntity)
    private readonly committeePrintBillRepo: Repository<CommitteePrintBillEntity>,
    @InjectRepository(CommitteeCommitteeReportEntity)
    private readonly committeeCommitteeReportRepo: Repository<CommitteeCommitteeReportEntity>,
    @InjectRepository(AmendmentSponsorEntity)
    private readonly amendmentSponsorRepo: Repository<AmendmentSponsorEntity>,
    @InjectRepository(AmendmentCosponsorEntity)
    private readonly amendmentCosponsorRepo: Repository<AmendmentCosponsorEntity>,
    @InjectRepository(AmendmentActionEntity)
    private readonly amendmentActionRepo: Repository<AmendmentActionEntity>,
    @InjectRepository(NominationActionEntity)
    private readonly nominationActionRepo: Repository<NominationActionEntity>,
    @InjectRepository(TreatyActionEntity)
    private readonly treatyActionRepo: Repository<TreatyActionEntity>,
    @InjectRepository(NominationCommitteeEntity)
    private readonly nominationCommitteeRepo: Repository<NominationCommitteeEntity>,
    @InjectRepository(SenateCommunicationCommitteeEntity)
    private readonly senateCommunicationCommitteeRepo: Repository<SenateCommunicationCommitteeEntity>,
    @InjectRepository(HouseCommunicationCommitteeEntity)
    private readonly houseCommunicationCommitteeRepo: Repository<HouseCommunicationCommitteeEntity>,
  ) {}

  @Cron('0 0 * * *', { name: 'CongressGovService.scraper' })
  async scraper() {}
  // bills
  async getBills(isSeeding?: boolean) {
    const updateDate = await this.billRepo
      .createQueryBuilder('entity')
      .select('MAX(entity.updateDateIncludingText)', 'max')
      .getRawOne<{ max: string }>();
    let done = false;
    let offset = 0;
    const limit = 250;
    const fromDateTime = updateDate?.max ?? dayjs().subtract(1, 'week').utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
    while (!done) {
      const bills = await this.api.getBills({ format: 'json', offset, limit, fromDateTime });
      if (!bills.length) break;
      const billNumbers = bills.map((bill) => bill.number);
      const dbBills = await this.billRepo.find({ select: ['number'], where: { number: In(billNumbers) } });
      const dbBillNumbers = dbBills.reduce<Record<string, Boolean | undefined>>((prev, bill) => ({ [bill.number]: true, ...prev }), {});
      for (const bill of bills) {
        if (dbBillNumbers[bill.number]) {
          await this.billRepo.update(bill.number, bill);
        } else {
          await this.billRepo.save(bill);
          const params = { billNumber: bill.number, billType: bill.type, congress: bill.congress, format: 'json' } as const;
          await this.getBillDetails(params);
          await this.getBillActions(params);
          await this.getBillCommittees(params);
          await this.getBillCosponsors(params);
        }
      }
      offset += limit;
      done = isSeeding || bills.length < limit;
    }
  }

  async getBillDetails(params: ICommonBillRequestParams) {
    const billdetails = await this.api.getBillDetails({ ...params, format: 'json' });
    if (billdetails) {
      await this.billRepo.update(params.billNumber, billdetails);
      if (billdetails.sponsors.length) {
        for (const sponsor of billdetails.sponsors) {
          await this.billSponsorRepo.save({ billNumber: params.billNumber, ...sponsor });
        }
      }
    }
  }

  async getBillActions(params: ICommonBillRequestParams) {
    let done = false;
    let offset = 0;
    let limit = 250;
    while (!done) {
      const billActions = await this.api.getBillActions({ ...params, format: 'json', offset, limit });
      for (const billAction of billActions) {
        await this.billActionRepo.save({ billNumber: params.billNumber, ...billAction });
      }
      offset += limit;
      done = billActions.length < limit;
    }
  }

  async getBillCommittees(params: ICommonBillRequestParams) {
    let done = false;
    let offset = 0;
    let limit = 250;
    while (!done) {
      const billCommittees = await this.api.getBillCommittee({ ...params, format: 'json', offset, limit });
      for (const billCommittee of billCommittees) {
        await this.billCommitteeRepo.save({ billNumber: params.billNumber, ...billCommittee });
      }
      offset += limit;
      done = billCommittees.length < limit;
    }
  }

  async getBillCosponsors(params: ICommonBillRequestParams) {
    let done = false;
    let offset = 0;
    let limit = 250;
    while (!done) {
      const billCosponsors = await this.api.getBillCosponsors({ ...params, format: 'json', offset, limit });
      for (const billCosponsor of billCosponsors) {
        await this.billCosponsorRepo.save(this.billCosponsorRepo.create({ billNumber: params.billNumber, ...billCosponsor }));
      }
      offset += limit;
      done = billCosponsors.length < limit;
    }
  }

  // amendments
  async getAmendments(isSeeding?: boolean) {
    const updateDate = await this.congressAmedmentsRepo
      .createQueryBuilder('entity')
      .select('MAX(entity.updateDate)', 'max')
      .getRawOne<{ max: string }>();
    let done = false;
    let offset = 0;
    let limit = 10;
    const fromDateTime = updateDate?.max ?? dayjs().subtract(1, 'week').utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
    while (!done) {
      const amendments = await this.api.getAmendments({ format: 'json', offset, limit, fromDateTime });
      if (!amendments.length) break;
      const amendmentNumbers = amendments.map((amendment) => amendment.number);
      const dbAmendments = await this.congressAmedmentsRepo.find({ select: ['number'], where: { number: In(amendmentNumbers) } });
      const dbAmendmentNumbers = dbAmendments.reduce<Record<string, Boolean | undefined>>(
        (prev, amendment) => ({ [amendment.number]: true, ...prev }),
        {},
      );
      for (const amendment of amendments) {
        if (dbAmendmentNumbers[amendment.number]) {
          await this.congressAmedmentsRepo.update(amendment.number, amendment);
        } else {
          await this.congressAmedmentsRepo.save(amendment);
          const params = {
            congress: amendment.congress,
            amendmentNumber: amendment.number,
            amendmentType: amendment.type,
            format: 'json',
          } as const;
          await this.getAmendmentDetails(params);
          await this.getAmendmentActions(params);
          await this.getAmendmentCosponsors(params);
        }
      }
      offset += limit;
      done = isSeeding || amendments.length < limit;
    }
  }

  async getAmendmentDetails(params: ICommonAmendmentRequestParams) {
    const amendmentDetails = await this.api.getAmendmentDetails({ ...params, format: 'json' });
    if (amendmentDetails) {
      await this.congressAmedmentsRepo.update(params.amendmentNumber, amendmentDetails);
      for (const sponsor of amendmentDetails.sponsors) {
        if (sponsor.bioguideId) {
          await this.amendmentSponsorRepo.save({ amendmentNumber: params.amendmentNumber, ...sponsor });
        }
      }
    }
  }

  async getAmendmentCosponsors(params: ICommonAmendmentRequestParams) {
    let done = false;
    let offset = 0;
    let limit = 250;
    while (!done) {
      const amendmentCosponsors = await this.api.getAmendmentCosponsors({ ...params, format: 'json', offset, limit });
      for (const amendmentCosponsor of amendmentCosponsors) {
        await this.amendmentCosponsorRepo.save({ amendmentNumber: params.amendmentNumber, ...amendmentCosponsor });
      }
      offset += limit;
      done = amendmentCosponsors.length < limit;
    }
  }

  async getAmendmentActions(params: ICommonAmendmentRequestParams) {
    let done = false;
    let offset = 0;
    let limit = 250;
    while (!done) {
      const amendmentActions = await this.api.getAmendmentActions({ ...params, format: 'json', offset, limit });
      for (const action of amendmentActions) {
        await this.amendmentActionRepo.save({ amendmentNumber: params.amendmentNumber, ...action });
      }
      offset += limit;
      done = amendmentActions.length < limit;
    }
  }

  // members
  async getMembers(isSeeding?: boolean) {
    let done = false;
    let offset = 0;
    let limit = 250;
    const updateDate = await this.congressMemberRepo
      .createQueryBuilder('entity')
      .select('MAX(entity.updateDate)', 'max')
      .getRawOne<{ max: string }>();
    const fromDateTime = updateDate?.max ?? dayjs().subtract(1, 'week').utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
    while (!done) {
      const members = await this.api.getMembers({ format: 'json', offset, limit, fromDateTime });
      if (!members.length) break;
      const memberId = members.map((member) => member.bioguideId);
      const dbMembers = await this.congressMemberRepo.find({ select: ['bioguideId'], where: { bioguideId: In(memberId) } });
      const dbMemeberId = dbMembers.reduce<Record<string, Boolean | undefined>>(
        (prev, member) => ({ [member.bioguideId]: true, ...prev }),
        {},
      );
      for (const member of members) {
        if (dbMemeberId[member.bioguideId]) await this.congressMemberRepo.update(member.bioguideId, member);
        else await this.congressMemberRepo.save(member);
      }
      offset += limit;
      done = isSeeding || members.length < limit;
    }
  }

  // committees
  async getCommittees(isSeeding?: boolean) {
    let done = false;
    let offset = 0;
    let limit = 250;
    while (!done) {
      const committees = await this.api.getCommittees({ format: 'json', offset, limit });
      if (!committees.length) break;
      const committeeId = committees.map((committee) => committee.systemCode);
      const dbCommittees = await this.committeeRepo.find({ select: ['systemCode'], where: { systemCode: In(committeeId) } });
      const dbCommitteeId = dbCommittees.reduce<Record<string, Boolean | undefined>>(
        (prev, committee) => ({ [committee.systemCode]: true, ...prev }),
        {},
      );
      for (const committee of committees) {
        if (dbCommitteeId[committee.systemCode]) await this.committeeRepo.update(committee.systemCode, committee);
        else await this.committeeRepo.save(committee);
      }
      offset += limit;
      done = isSeeding || committees.length < limit;
    }
  }

  // committee reports
  async getCommitteeReports(isSeeding?: boolean) {
    let done = false;
    let offset = 0;
    let limit = 250;
    const updateDate = await this.committeeReportRepo
      .createQueryBuilder('entity')
      .select('MAX(entity.updateDate)', 'max')
      .getRawOne<{ max: string }>();
    const fromDateTime = updateDate?.max ?? dayjs().subtract(1, 'week').utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
    while (!done) {
      const reports = await this.api.getCommitteeReports({ format: 'json', offset, limit, fromDateTime });
      if (!reports.length) break;
      const reportId = reports.map((report) => report.number);
      const dbReports = await this.committeeReportRepo.find({ select: ['number'], where: { number: In(reportId) } });
      const dbReportId = dbReports.reduce<Record<string, Boolean | undefined>>((prev, report) => ({ [report.number]: true, ...prev }), {});
      for (const report of reports) {
        if (dbReportId[report.number]) {
          await this.committeeReportRepo.update(report.number, report);
        } else {
          await this.committeeReportRepo.save(report);
          await this.getCommitteeReportDetails({
            congress: report.congress,
            reportNumber: report.number,
            reportType: report.type,
            format: 'json',
          });
        }
      }
      offset += limit;
      done = isSeeding || reports.length < limit;
    }
  }

  async getCommitteeReportDetails(params: ICommonCommitteeReportRequestParams) {
    const reportDetails = await this.api.getCommitteeReportDetails({ ...params, format: 'json' });
    await this.committeeReportRepo.update(params.reportNumber, { title: reportDetails[0].title });
    for (const bill of reportDetails[0].associatedBill) {
      await this.committeeReportBillRepo.save({
        committeeReportNumber: params.reportNumber,
        billNumber: bill.number,
        billType: bill.type,
      });
    }
    for (const committee of reportDetails[0].committees) {
      await this.committeeCommitteeReportRepo.save({
        reportNumber: params.reportNumber,
        systemCode: committee.systemCode,
        name: committee.name,
      });
    }
  }

  // committee meetings
  async getCommitteeMeetings(isSeeding?: boolean) {
    let done = false;
    let offset = 0;
    let limit = 250;
    const updateDate = await this.committeeMeetingRepo
      .createQueryBuilder('entity')
      .select('MAX(entity.updateDate)', 'max')
      .getRawOne<{ max: string }>();
    const fromDateTime = updateDate?.max ?? dayjs().subtract(1, 'week').utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
    while (!done) {
      const meetings = await this.api.getCommitteeMeeting({ format: 'json', offset, limit, fromDateTime });
      if (!meetings.length) break;
      const meetingId = meetings.map((meeting) => meeting.eventId);
      const dbMeetings = await this.committeeMeetingRepo.find({ select: ['eventId'], where: { eventId: In(meetingId) } });
      const dbMeetingId = dbMeetings.reduce<Record<string, Boolean | undefined>>(
        (prev, meeting) => ({ [meeting.eventId]: true, ...prev }),
        {},
      );
      for (const meeting of meetings) {
        if (dbMeetingId[meeting.eventId]) {
          await this.committeeMeetingRepo.update(meeting.eventId, meeting);
        } else {
          await this.committeeMeetingRepo.save(meeting);
          await this.getCommitteeMeetingDetails({ ...meeting, format: 'json' });
        }
      }
      offset += limit;
      done = isSeeding || meetings.length < limit;
    }
  }

  async getCommitteeMeetingDetails(params: ICommonCommitteeMeetingRequestParams) {
    const meetingDetails = await this.api.getCommitteeMeetingDetails({ ...params, format: 'json' });
    await this.committeeMeetingRepo.update(params.eventId, meetingDetails);
    for (const committee of meetingDetails.committees) {
      await this.committeeCommitteeMeetingRepo.save({ eventId: params.eventId, ...committee });
    }
  }

  //committee prints
  async getCommitteePrints(isSeeding?: boolean) {
    let done = false;
    let offset = 0;
    let limit = 250;
    const updateDate = await this.committeePrintRepo
      .createQueryBuilder('entity')
      .select('MAX(entity.updateDate)', 'max')
      .getRawOne<{ max: string }>();
    const fromDateTime = updateDate?.max ?? dayjs().subtract(1, 'week').utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
    while (!done) {
      const prints = await this.api.getCommitteePrints({ format: 'json', offset, limit, fromDateTime });
      if (!prints.length) break;
      const printId = prints.map((print) => print.jacketNumber);
      const dbPrints = await this.committeePrintRepo.find({ select: ['jacketNumber'], where: { jacketNumber: In(printId) } });
      const dbPrintId = dbPrints.reduce<Record<string, Boolean | undefined>>(
        (prev, print) => ({ [print.jacketNumber]: true, ...prev }),
        {},
      );
      for (const print of prints) {
        if (dbPrintId[print.jacketNumber]) await this.committeePrintRepo.update(print.jacketNumber, print);
        else {
          await this.committeePrintRepo.save(print);
          await this.getCommitteePrintDetails({ ...print, format: 'json' });
        }
      }
      offset += limit;
      done = isSeeding || prints.length < limit;
    }
  }

  async getCommitteePrintDetails(params: ICommonCommitteePrintRequestParams) {
    const printDetails = await this.api.getCommitteePrintDetails({ ...params, format: 'json' });
    await this.committeePrintRepo.update(params.jacketNumber, { title: printDetails[0].title });
    for (const bill of printDetails[0].associatedBills) {
      await this.committeePrintBillRepo.save({ jacketNumber: params.jacketNumber, ...bill });
    }
    for (const committee of printDetails[0].committees) {
      await this.committeeCommitteePrintRepo.save({ jacketNumber: params.jacketNumber, ...committee });
    }
  }

  // summaries
  async getSummeries(isSeeding?: boolean) {
    let done = false;
    let offset = 0;
    let limit = 250;
    const updateDate = await this.summaryRepo
      .createQueryBuilder('entity')
      .select('MAX(entity.updateDate)', 'max')
      .getRawOne<{ max: string }>();
    const fromDateTime = updateDate?.max ?? dayjs().subtract(1, 'week').utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
    while (!done) {
      const summaries = await this.api.getSummeries({ format: 'json', offset, limit, fromDateTime });
      if (!summaries.length) break;
      const summaryBillNumber = summaries.map((summary) => summary.bill.number);
      const dbSummaries = await this.summaryRepo.find({ select: ['billNumber'], where: { billNumber: In(summaryBillNumber) } });
      const dbNominationId = dbSummaries.reduce<Record<string, Boolean | undefined>>(
        (prev, summary) => ({ [summary.billNumber]: true, ...prev }),
        {},
      );
      for (const summary of summaries) {
        if (dbNominationId[summary.billNumber]) await this.summaryRepo.update(summary.billNumber, summary);
        else await this.summaryRepo.save(summary);
      }
      offset += limit;
      done = isSeeding || summaries.length < limit;
    }
  }

  // nominations
  async getNominations(isSeeding?: boolean) {
    let done = false;
    let offset = 0;
    let limit = 250;
    const updateDate = await this.nominationRepo
      .createQueryBuilder('entity')
      .select('MAX(entity.updateDate)', 'max')
      .getRawOne<{ max: string }>();
    const fromDateTime = updateDate?.max ?? dayjs().subtract(1, 'week').utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
    while (!done) {
      const nominations = await this.api.getNominations({ format: 'json', offset, limit, fromDateTime });
      if (!nominations.length) break;
      const nominationNumber = nominations.map((nomination) => nomination.number);
      const dbNominations = await this.nominationRepo.find({ select: ['number'], where: { number: In(nominationNumber) } });
      const dbNominationId = dbNominations.reduce<Record<string, Boolean | undefined>>(
        (prev, nomination) => ({ [nomination.number]: true, ...prev }),
        {},
      );
      for (const nomination of nominations) {
        if (dbNominationId[nomination.number]) {
          await this.nominationRepo.update(nomination.number, nomination);
        } else {
          await this.nominationRepo.save(nomination);
          const params = { congress: nomination.congress, nominationNumber: nomination.number, format: 'json' } as const;
          await this.getNominationActions(params);
          await this.getNominationCommittees(params);
        }
      }
      offset += limit;
      done = isSeeding || nominations.length < limit;
    }
  }

  async getNominationActions(params: ICommonNominationRequestParams) {
    let done = false;
    let offset = 0;
    let limit = 250;
    while (!done) {
      const nominationActions = await this.api.getNominationActions({ ...params, format: 'json', offset, limit });
      for (const action of nominationActions) {
        await this.nominationActionRepo.save({ nominationNumber: params.nominationNumber, ...action });
      }
      offset += limit;
      done = nominationActions.length < limit;
    }
  }

  async getNominationCommittees(params: ICommonNominationRequestParams) {
    let done = false;
    let offset = 0;
    let limit = 250;
    while (!done) {
      const nominationCommittees = await this.api.getNominationCommittees({ ...params, format: 'json', offset, limit });
      for (const committee of nominationCommittees) {
        await this.nominationCommitteeRepo.save({ nominationNumber: params.nominationNumber, ...committee });
      }
      offset += limit;
      done = nominationCommittees.length < limit;
    }
  }

  // treaty
  async getTreaty(isSeeding?: boolean) {
    let done = false;
    let offset = 0;
    let limit = 10;
    const updateDate = await this.treatyRepo
      .createQueryBuilder('entity')
      .select('MAX(entity.updateDate)', 'max')
      .getRawOne<{ max: string }>();
    const fromDateTime = updateDate?.max ?? dayjs().subtract(1, 'week').utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
    while (!done) {
      const treaties = await this.api.getTreaty({ format: 'json', offset, limit, fromDateTime });
      if (!treaties.length) break;
      const treatyNumber = treaties.map((treaty) => treaty.treatyNum);
      const dbTreaties = await this.treatyRepo.find({ select: ['treatyNum'], where: { treatyNum: In(treatyNumber) } });
      const dbTreatyId = dbTreaties.reduce<Record<string, Boolean | undefined>>(
        (prev, treaty) => ({ [treaty.treatyNum]: true, ...prev }),
        {},
      );
      for (const treaty of treaties) {
        if (dbTreatyId[treaty.treatyNum]) await this.treatyRepo.update(treaty.treatyNum, treaty);
        else {
          await this.treatyRepo.save(treaty);
          await this.getTreatyActions({ congress: treaty.congress, treatyNumber: treaty.treatyNum, format: 'json' });
        }
      }
      offset += limit;
      done = isSeeding || treaties.length < limit;
    }
  }

  async getTreatyActions(params: ICommonTreatyRequestParams) {
    let done = false;
    let offset = 0;
    let limit = 250;
    while (!done) {
      const treatyActions = await this.api.getTreatyActions({ ...params, format: 'json', offset, limit });
      for (const action of treatyActions) {
        await this.treatyActionRepo.save({ treatyNum: params.treatyNumber, ...action });
      }
      offset += limit;
      done = treatyActions.length < limit;
    }
  }

  // senate communication
  async getSenateCommunication(isSeeding?: boolean) {
    let done = false;
    let offset = 0;
    let limit = 250;
    const updateDate = await this.senateCommunicationRepo
      .createQueryBuilder('entity')
      .select('MAX(entity.updateDate)', 'max')
      .getRawOne<{ max: string }>();
    const fromDateTime = updateDate?.max ?? dayjs().subtract(1, 'week').utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
    while (!done) {
      const senateCommunications = await this.api.getSenateCommunications({ format: 'json', offset, limit, fromDateTime });
      if (!senateCommunications.length) break;
      const senateCommunicationNumber = senateCommunications.map((senateCommunication) => senateCommunication.number);
      const dbSenateCommunications = await this.senateCommunicationRepo.find({
        select: ['number'],
        where: { number: In(senateCommunicationNumber) },
      });
      const dbSenateCommunicationId = dbSenateCommunications.reduce<Record<string, Boolean | undefined>>(
        (prev, senateCommunication) => ({ [senateCommunication.number]: true, ...prev }),
        {},
      );
      for (const senateCommunication of senateCommunications) {
        if (dbSenateCommunicationId[senateCommunication.number])
          await this.senateCommunicationRepo.update(senateCommunication.number, senateCommunication);
        else {
          await this.senateCommunicationRepo.save(senateCommunication);
          await this.getSenateCommunicationDetails({
            congress: senateCommunication.congress,
            communicationNumber: senateCommunication.number,
            communicationType: senateCommunication.communicationType.code,
            format: 'json',
          });
        }
      }
      offset += limit;
      done = isSeeding || senateCommunications.length < limit;
    }
  }

  async getSenateCommunicationDetails(params: ICommonCommunicationRequestParams) {
    const communications = await this.api.getSenateCommunicationDetails({ ...params, format: 'json' });
    if (communications) {
      await this.senateCommunicationRepo.update(params.communicationNumber, communications);
      for (const committee of communications.committees) {
        await this.senateCommunicationCommitteeRepo.save({ communicationNumber: params.communicationNumber, ...committee });
      }
    }
  }

  // house communication
  async getHouseCommunication(isSeeding?: boolean) {
    let done = false;
    let offset = 0;
    let limit = 250;
    while (!done) {
      const houseCommunications = await this.api.getHouseCommunications({ format: 'json', offset, limit });
      if (!houseCommunications.length) break;
      const houseCommunicationNumber = houseCommunications.map((houseCommunication) => houseCommunication.communicationNumber);
      const dbHouseCommunications = await this.houseCommunicationRepo.find({
        select: ['communicationNumber'],
        where: { communicationNumber: In(houseCommunicationNumber) },
      });
      const dbHouseCommunicationId = dbHouseCommunications.reduce<Record<string, Boolean | undefined>>(
        (prev, houseCommunication) => ({ [houseCommunication.communicationNumber]: true, ...prev }),
        {},
      );
      for (const houseCommunication of houseCommunications) {
        if (dbHouseCommunicationId[houseCommunication.communicationNumber]) {
          await this.houseCommunicationRepo.update(houseCommunication.communicationNumber, houseCommunication);
        } else {
          await this.houseCommunicationRepo.save(houseCommunication);
          await this.getHouseCommunicationDetails({
            congress: houseCommunication.congressNumber,
            communicationNumber: houseCommunication.communicationNumber,
            communicationType: houseCommunication.communicationType.code,
            format: 'json',
          });
        }
      }
      offset += limit;
      done = isSeeding || houseCommunications.length < limit;
    }
  }

  async getHouseCommunicationDetails(params: ICommonCommunicationRequestParams) {
    const communications = await this.api.getHouseCommunicationDetails({ ...params, format: 'json' });
    await this.houseCommunicationRepo.update(params.communicationNumber, communications);
    for (const committee of communications.committees) {
      await this.houseCommunicationCommitteeRepo.save({ communicationNumber: params.communicationNumber, ...committee });
    }
  }

  // congressional records
  async getCongressionalRecords(isSeeding?: boolean) {
    let done = false;
    let offset = 0;
    let limit = 250;
    while (!done) {
      const congressionalRecords = await this.api.getCongressionalRecords({ format: 'json', offset, limit });
      if (!congressionalRecords.length) break;
      const congressionalRecordId = congressionalRecords.map((congressionalRecord) => congressionalRecord.id);
      const dbCongressionalRecords = await this.congressionalRecordRepo.find({ select: ['id'], where: { id: In(congressionalRecordId) } });
      const dbCongressionalRecordId = dbCongressionalRecords.reduce<Record<string, Boolean | undefined>>(
        (prev, congressionalRecord) => ({ [congressionalRecord.id]: true, ...prev }),
        {},
      );
      for (const congressionalRecord of congressionalRecords) {
        if (dbCongressionalRecordId[congressionalRecord.id])
          await this.congressionalRecordRepo.update(congressionalRecord.id, congressionalRecord);
        else await this.congressionalRecordRepo.save(congressionalRecord);
      }
      offset += limit;
      done = isSeeding || congressionalRecords.length < limit;
    }
  }

  // hearings
  async getHearing(isSeeding?: boolean) {
    let done = false;
    let offset = 0;
    let limit = 250;
    while (!done) {
      const hearings = await this.api.getHearings({ format: 'json', offset, limit });
      if (!hearings.length) break;
      const hearingNumber = hearings.map((hearing) => hearing.jacketNumber);
      const dbHearings = await this.hearingRepo.find({ select: ['jacketNumber'], where: { jacketNumber: In(hearingNumber) } });
      const dbHearingId = dbHearings.reduce<Record<string, Boolean | undefined>>(
        (prev, hearing) => ({ [hearing.jacketNumber]: true, ...prev }),
        {},
      );
      for (const hearing of hearings) {
        if (dbHearingId[hearing.jacketNumber]) await this.hearingRepo.update(hearing.jacketNumber, hearing);
        else await this.hearingRepo.save(hearing);
      }
      offset += limit;
      done = isSeeding || hearings.length < limit;
    }
  }

  // house requirement
  async getHouseRequirement(isSeeding?: boolean) {
    let done = false;
    let offset = 0;
    let limit = 250;
    while (!done) {
      const houseRequirements = await this.api.getHouseRequirements({ format: 'json', offset, limit });
      if (!houseRequirements.length) break;
      const houseRequirementNumber = houseRequirements.map((houseRequirement) => houseRequirement.number);
      const dbHouseRequirements = await this.houseRequirementRepo.find({
        select: ['number'],
        where: { number: In(houseRequirementNumber) },
      });
      const dbHouseRequirementId = dbHouseRequirements.reduce<Record<string, Boolean | undefined>>(
        (prev, houseRequirement) => ({ [houseRequirement.number]: true, ...prev }),
        {},
      );
      for (const houseRequirement of houseRequirements) {
        if (dbHouseRequirementId[houseRequirement.number])
          await this.houseRequirementRepo.update(houseRequirement.number, houseRequirement);
        else await this.houseRequirementRepo.save(houseRequirement);
      }
      offset += limit;
      done = isSeeding || houseRequirements.length < limit;
    }
  }
}
