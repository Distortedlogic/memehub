import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { congressGovEnvironment } from '../../config/keys/congress-gov.config';
import { CongressApiClearDbCommand } from './commands/congress-api-clear-db';
import { CongressApiSeedDbCommand } from './commands/congress-api-seed-db';
import { CongressGovApi } from './congress-gov.api';
import { CongressGovCron } from './congress-gov.cron';
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
import { SponsoredLegislationEntity } from './entities/sponsored-legislation.entity';
import { CongressSummaryEntity } from './entities/summary.entity';
import { TreatyActionEntity } from './entities/treaty/treaty-action.entity';
import { CongressTreatyEntity } from './entities/treaty/treaty.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CongressMemberEntity,
      BillEntity,
      CommitteeEntity,
      SponsoredLegislationEntity,
      AmendmentEntity,
      CongressSummaryEntity,
      CongressNominationEntity,
      CongressCommitteeMeetingEntity,
      CongressCommitteePrintEntity,
      CongressCommitteeReportEntity,
      CongressTreatyEntity,
      CongressHouseCommunicationEntity,
      CongressSenateCommunicationEntity,
      CongressionalRecordEntity,
      CongressHearingEntity,
      CongressHouseRequirementEntity,
      BillActionsEntity,
      BillCommitteeEntity,
      BillCosponsorEntity,
      BillSponsorEntity,
      SenateCommunicationCommitteeEntity,
      HouseCommunicationCommitteeEntity,
      AmendmentActionEntity,
      AmendmentCosponsorEntity,
      AmendmentSponsorEntity,
      CommitteeCommitteeMeetingEntity,
      CommitteeCommitteePrintEntity,
      CommitteeCommitteeReportEntity,
      CommitteeReportBillEntity,
      CommitteePrintBillEntity,
      NominationActionEntity,
      NominationCommitteeEntity,
      TreatyActionEntity,
    ]),
    ConfigModule.forRoot({ load: [congressGovEnvironment] }),
    HttpModule.register({ baseURL: 'https://api.congress.gov/v3' }),
  ],
  providers: [CongressGovApi, CongressGovCron, CongressApiClearDbCommand, CongressApiSeedDbCommand],
  exports: [CongressGovApi],
})
export class CongressGovModule {}
