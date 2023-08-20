import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@ObjectType()
@Entity('committee_committee_meetings')
export class CommitteeCommitteeMeetingEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Field()
  @Column({ name: 'event_id' })
  eventId: string;

  @Field()
  @Column({ name: 'system_code' })
  systemCode: string;

  @Field()
  @Column()
  name: string;
}
