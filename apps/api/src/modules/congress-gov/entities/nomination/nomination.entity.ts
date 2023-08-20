import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
export class NominationAction {
  @Field()
  actionDate: string;

  @Field()
  text: string;
}

@ObjectType()
export class NominationType {
  @Field()
  isMilitary: boolean;
}

@ObjectType()
@Entity('congress_nominations')
export class CongressNominationEntity {
  @Field(() => ID)
  @PrimaryColumn()
  number: number;

  @Field()
  @Column()
  citation: string;

  @Field(() => Int)
  @Column()
  congress: number;

  @Field(() => NominationType)
  @Column('jsonb', { name: 'nomination_type' })
  nominationType: NominationType;

  @Field(() => NominationAction)
  @Column('jsonb', { name: 'latest_action' })
  latestAction: NominationAction;

  @Field()
  @Column()
  organization: string;

  @Field()
  @Column({ name: 'part_number' })
  partNumber: string;

  @Field()
  @Column({ name: 'received_date' })
  receivedDate: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'update_date' })
  updateDate?: string;

  @Field()
  @Column()
  url: string;
}
