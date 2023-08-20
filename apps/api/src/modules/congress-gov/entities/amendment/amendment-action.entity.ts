import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@ObjectType()
export class RecordedVotesData {
  @Field()
  chamber: 'House' | 'Senate';

  @Field(() => Int)
  congress: number;

  @Field()
  date: string;

  @Field(() => Int)
  rollNumber: number;

  @Field(() => Int)
  sessionNumber: number;

  @Field()
  url: string;
}

@ObjectType()
export class AmendmentSourceSystemData {
  @Field(() => Int)
  code: number;

  @Field()
  name: string;
}

@ObjectType()
@Entity('amendment_actions')
export class AmendmentActionEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Field()
  @Column({ name: 'amendment_number' })
  amendmentNumber: string;

  @Field()
  @Column({ name: 'action_date' })
  actionDate: string;

  @Field(() => [RecordedVotesData], { nullable: true })
  @Column('jsonb', { nullable: true, name: 'recorded_votes' })
  recordedVotes?: RecordedVotesData[];

  @Field(() => [AmendmentSourceSystemData], { nullable: true })
  @Column('jsonb', { nullable: true, name: 'source_system' })
  sourceSystem?: AmendmentSourceSystemData[];

  @Field()
  @Column({ nullable: true })
  text?: string;

  @Field()
  @Column({ nullable: true })
  type?: string;
}
