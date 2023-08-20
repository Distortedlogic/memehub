import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity('congress_committee_meetings')
export class CongressCommitteeMeetingEntity {
  @Field(() => ID)
  @PrimaryColumn({ name: 'event_id' })
  eventId: string;

  @Field()
  @Column()
  chamber: 'House' | 'Senate';

  @Field(() => Int)
  @Column()
  congress: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  part?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  date?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'update_date' })
  updateDate?: string;

  @Field()
  @Column()
  url: string;
}
