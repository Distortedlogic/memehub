import { CommandRunner, SubCommand } from 'nest-commander';
import { RssService } from '../../rss.service';

@SubCommand({ name: 'reconcile' })
export class ReconcileCommand extends CommandRunner {
  constructor(private readonly rssService: RssService) {
    super();
  }

  async run() {
    try {
      await this.rssService.reconcile();
      process.exit(0);
    } catch (error) {
      process.exit(1);
    }
  }
}
