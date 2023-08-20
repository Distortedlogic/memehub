import { CommandRunner, SubCommand } from 'nest-commander';
import { RssService } from '../../rss.service';

@SubCommand({ name: 'seed' })
export class RssSeedCommand extends CommandRunner {
  constructor(private readonly rssService: RssService) {
    super();
  }

  async run() {
    try {
      await this.rssService.seed();
      process.exit(0);
    } catch (error) {
      process.exit(1);
    }
  }
}
