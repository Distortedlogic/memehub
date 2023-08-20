import { CommandRunner, SubCommand } from 'nest-commander';
import { FakerService } from '../../faker.service';

@SubCommand({ name: 'seed' })
export class DbSeedCommand extends CommandRunner {
  constructor(private readonly fakerService: FakerService) {
    super();
  }
  async run() {
    try {
      await this.fakerService.seedDb();
      process.exit(0);
    } catch (error) {
      console.log('EXIT 1');
      process.exit(1);
    }
  }
}
