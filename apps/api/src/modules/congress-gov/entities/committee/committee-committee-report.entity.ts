import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@ObjectType()
@Entity('committee_committee_reports')
export class CommitteeCommitteeReportEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Field()
  @Column({ name: 'system_code' })
  systemCode: string;

  @Field(() => Int)
  @Column({ name: 'report_number' })
  reportNumber: number;

  @Field()
  @Column()
  name: string;
}
