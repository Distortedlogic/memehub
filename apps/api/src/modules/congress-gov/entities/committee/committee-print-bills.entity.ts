import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@ObjectType()
@Entity('committee_print_bills')
export class CommitteePrintBillEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Field(() => Int)
  @Column({ name: 'jacket_number' })
  jacketNumber: number;

  @Field()
  @Column({ name: 'bill_number' })
  billNumber: string;

  @Field()
  @Column({ name: 'bill_type' })
  billType: string;
}
