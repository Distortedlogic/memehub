import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
export class ParentData {
  @Field()
  name: string;

  @Field()
  systemCode: string;

  @Field()
  url: string;
}

@ObjectType()
@Entity('congress_committees')
export class CommitteeEntity {
  @Field(() => ID)
  @PrimaryColumn({ name: 'system_code' })
  systemCode: string;

  @Field()
  @Column()
  chamber: 'House' | 'Senate';

  @Field()
  @Column({ name: 'committee_type_code' })
  committeeTypeCode: 'Standing' | string;

  @Field()
  @Column()
  name: string;

  @Field(() => ParentData, { nullable: true })
  @Column('jsonb', { nullable: true })
  parent?: ParentData;

  @Field(() => [SubcommitteeDTO], { nullable: true })
  @Column('jsonb', { nullable: true, name: 'sub_committees' })
  subCommittees?: SubcommitteeDTO[];

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'update_date' })
  updateDate?: string;

  @Field()
  @Column()
  url: string;
}

@ObjectType()
export class SubcommitteeDTO {
  @Field()
  name: string;

  @Field()
  systemCode: string;

  @Field()
  url: string;
}
