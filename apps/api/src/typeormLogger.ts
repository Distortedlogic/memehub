import { Logger as NestLogger } from '@nestjs/common';
import { QueryRunner, Logger as TypeOrmLogger } from 'typeorm';

export class DatabaseLogger implements TypeOrmLogger {
  private readonly logger = new NestLogger('SQL');

  logQuery(_query: string, _parameters?: any[], _queryRunner?: QueryRunner) {
    // this.logger.log(`_queryRunner?.data: ${this.stringifyParameters(_queryRunner?.data)}`);
    // let logText = query;
    // if (logText.length > 100)
    //   // Truncate the log text if it's too long:
    //   logText = logText.substring(0, 10) + "...";
    // this.logger.log(`${query} -- Parameters: ${this.stringifyParameters(parameters)}`);
  }

  logQueryError(error: string, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    this.logger.error(`${query} -- Parameters: ${this.stringifyParameters(parameters)} -- ${error}`);
  }

  logQuerySlow(time: number, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    this.logger.warn(`Time: ${time} -- Parameters: ${this.stringifyParameters(parameters)} -- ${query}`);
  }

  logMigration(message: string, _queryRunner?: QueryRunner) {
    this.logger.log(message);
  }

  logSchemaBuild(message: string, _queryRunner?: QueryRunner) {
    this.logger.log(message);
  }

  log(_level: 'log' | 'info' | 'warn', _message: string, _queryRunner?: QueryRunner) {
    // if (level === "log") {
    //   return this.logger.log(message);
    // }
    // if (level === "info") {
    //   return this.logger.debug(message);
    // }
    // if (level === "warn") {
    //   return this.logger.warn(message);
    // }
  }

  private stringifyParameters(parameters?: unknown) {
    try {
      return JSON.stringify(parameters);
    } catch {
      return '';
    }
  }
}
