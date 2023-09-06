import { Command, CommandRunner } from 'nest-commander';
import { DbSeedCommand } from './subcommands/seed';

@Command({
  name: 'db',
  subCommands: [DbSeedCommand],
})
export class DbCommand extends CommandRunner {
  async run() {
    console.log('FIRE!!!!');
  }
}
