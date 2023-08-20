import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@ObjectType()
@Entity('committee_report_bills')
export class CommitteeReportBillEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Field(() => Int)
  @Column({ name: 'committee_report_number' })
  committeeReportNumber: number;

  @Field()
  @Column({ name: 'bill_number' })
  billNumber: string;

  @Field()
  @Column({ name: 'bill_type' })
  billType: string;
}
