import { Field } from '@nestjs/graphql';
import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('rss_subscription_to_user')
export class RssSubscriptionToUserEntity {
  @PrimaryColumn('uuid', { name: 'user_id' })
  userId: string;

  @PrimaryColumn({ name: 'subscription_id' })
  subscription_id: string;

  @Field(() => String)
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    nullable: false,
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return value.toISOString();
      },
    },
  })
  createdAt: string;
}
