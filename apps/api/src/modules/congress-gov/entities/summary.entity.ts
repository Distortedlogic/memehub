import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
export class BillSummary {
  @Field(() => Int)
  congress: number;

  @Field()
  number: string;

  @Field()
  originChamber: string;

  @Field()
  originChamberCode: string;

  @Field()
  title: string;

  @Field()
  type: string;

  @Field()
  updateDateIncludingText: string;

  @Field()
  url: string;
}

@ObjectType()
@Entity('congress_summaries')
export class CongressSummaryEntity {
  @Field(() => ID)
  @PrimaryColumn({ name: 'bill_number' })
  billNumber: string;

  @Field()
  @Column({ name: 'action_date' })
  actionDate: string;

  @Field()
  @Column({ name: 'action_desc' })
  actionDesc: string;

  @Field(() => BillSummary)
  @Column('jsonb')
  bill: BillSummary;

  @Field()
  @Column({ name: 'current_chamber' })
  currentChamber: string;

  @Field()
  @Column({ name: 'current_chamber_code' })
  currentChamberCode: string;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column({ name: 'version_code' })
  versionCode: string;

  @Field()
  @Column({ name: 'last_summary_update_date' })
  lastSummaryUpdateDate: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'update_date' })
  updateDate?: string;
}
