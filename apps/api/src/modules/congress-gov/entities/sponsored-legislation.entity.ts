import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class LegislationAction {
  @Field()
  actionDate: string;

  @Field()
  text: string;
}

@ObjectType()
export class PolicyArea {
  @Field()
  name: string;
}

@ObjectType()
@Entity('congress_sponsored_legislations')
export class SponsoredLegislationEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field(() => Int)
  @Column()
  congress: number;

  @Field()
  @Column({ name: 'introduced_date' })
  introducedDate: string;

  @Field(() => LegislationAction)
  @Column('jsonb', { name: 'latest_action' })
  latestAction: LegislationAction;

  @Field()
  @Column()
  number: string;

  @Field(() => PolicyArea)
  @Column('jsonb', { name: 'policy_area' })
  policyArea: PolicyArea;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  url: string;
}
