import { Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { ESubscription } from '../../registry/subscription.r';
import { RssEntryEntity } from './entities/rss.entry.entity';

@EventSubscriber()
@Injectable()
export class RssEntrySubscriber implements EntitySubscriberInterface<RssEntryEntity> {
  constructor(
    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
    private readonly dataSource: DataSource,
  ) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return RssEntryEntity;
  }

  afterInsert({ entity }: InsertEvent<RssEntryEntity>): void {
    this.pubSub.publish(ESubscription.RssFeed, entity);
  }
}
