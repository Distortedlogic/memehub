import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity('congress_committee_reports')
export class CongressCommitteeReportEntity {
  @Field(() => ID)
  @PrimaryColumn()
  number: number;

  @Field()
  @Column()
  chamber: 'House' | 'Senate';

  @Field()
  @Column()
  citation: string;

  @Field(() => Int)
  @Column()
  congress: number;

  @Field(() => Int)
  @Column()
  part: number;

  @Field()
  @Column()
  type: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'update_date' })
  updateDate?: string;

  @Field()
  @Column()
  url: string;
}
