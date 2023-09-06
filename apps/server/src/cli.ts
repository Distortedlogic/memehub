#!/usr/bin/env node

import { Logger } from '@nestjs/common';
import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

(async () => {
  await CommandFactory.run(AppModule, { logger: new Logger(), abortOnError: false, cliName: 'Memehub CLI' });
})();
