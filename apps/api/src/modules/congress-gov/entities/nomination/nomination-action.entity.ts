import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@ObjectType()
export class NominationCommitteeData {
  @Field()
  name: string;

  @Field()
  systemCode: string;
}

@ObjectType()
@Entity('nomination_actions')
export class NominationActionEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Field(() => Int)
  @Column({ name: 'nomination_number' })
  nominationNumber: number;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'action_code' })
  actionCode?: string;

  @Field(() => [NominationCommitteeData], { nullable: true })
  @Column('jsonb', { nullable: true })
  committee?: NominationCommitteeData[];

  @Field()
  @Column({ name: 'action_date' })
  actionDate: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  type?: string;
}
