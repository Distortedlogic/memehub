import { Command, CommandRunner } from 'nest-commander';

@Command({ name: 'congress-api-clear-db' })
export class CongressApiClearDbCommand extends CommandRunner {
  constructor() {
    super();
  }
  async run() {}
}
