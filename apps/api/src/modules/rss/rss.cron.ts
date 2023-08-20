import { Injectable } from '@nestjs/common';
import { RssService } from './rss.service';

@Injectable()
export class RssCron {
  constructor(private readonly service: RssService) {}

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  reconcile() {
    this.service.reconcile();
  }
}
