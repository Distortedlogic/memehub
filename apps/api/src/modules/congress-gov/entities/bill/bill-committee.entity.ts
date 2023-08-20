import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@ObjectType()
@Entity('bill_committees')
export class BillCommitteeEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Field()
  @Column({ name: 'bill_number' })
  billNumber: string;

  @Field()
  @Column({ name: 'system_code' })
  systemCode: string;

  @Field()
  @Column()
  name: string;
}
