import { Command, CommandRunner } from 'nest-commander';
import { ReconcileCommand } from './subcommands/reconcile';
import { RssSeedCommand } from './subcommands/seed';

@Command({
  name: 'rss',
  subCommands: [ReconcileCommand, RssSeedCommand],
})
export class RssCommand extends CommandRunner {
  async run() {}
}
