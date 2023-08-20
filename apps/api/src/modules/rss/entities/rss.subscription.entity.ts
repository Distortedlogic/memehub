import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CreatedAtColumn } from '../../abstracts/created-at.column';

@ObjectType()
@Entity('rss_subscriptions')
export class RssSubscriptionEntity extends CreatedAtColumn {
  @Field(() => ID)
  @PrimaryColumn()
  subscription_id: string;

  @Field()
  @Column()
  status: 'subscribed' | string;

  @Field()
  @Column()
  feed_type: 'rss' | 'json' | 'atom' | string;

  @Field()
  @Column()
  webhook_url: string;

  @Field()
  @Column()
  url: string;

  @Field()
  @Column()
  info: string;
}
