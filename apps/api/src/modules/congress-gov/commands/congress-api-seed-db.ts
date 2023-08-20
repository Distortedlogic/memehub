import { Command, CommandRunner } from 'nest-commander';
import { CongressGovCron } from '../congress-gov.cron';

@Command({ name: 'congress-api-seed-db' })
export class CongressApiSeedDbCommand extends CommandRunner {
  constructor(private readonly congressApi: CongressGovCron) {
    super();
  }
  async run() {
    await this.congressApi.getBills(true);
    // await this.congressApi.getAmendments(true);
    // await this.congressApi.getCongressionalRecords(true);
    // await this.congressApi.getHearing(true);
    // await this.congressApi.getHouseCommunication(true);
    // await this.congressApi.getSenateCommunication(true);
    // await this.congressApi.getHouseRequirement(true);
    // await this.congressApi.getNominations(true);
    // await this.congressApi.getMembers(true);
    // await this.congressApi.getTreaty(true);
    // await this.congressApi.getSummeries(true);
    // await this.congressApi.getCommittees(true);
    // await this.congressApi.getCommitteeMeetings(true);
    // await this.congressApi.getCommitteeReports(true);
    // await this.congressApi.getCommitteePrints(true);
    process.exit(0);
  }
}
