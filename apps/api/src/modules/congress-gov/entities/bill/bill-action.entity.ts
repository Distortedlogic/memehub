import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@ObjectType()
export class BillSourceSystemData {
  @Field(() => Int)
  code: number;

  @Field()
  name: string;
}

@ObjectType()
@Entity('bill_actions')
export class BillActionsEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Field()
  @Column({ name: 'bill_number' })
  billNumber: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'action_code' })
  actionCode?: string;

  @Field()
  @Column({ name: 'action_date' })
  actionDate: string;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column()
  type: string;

  @Field(() => BillSourceSystemData, { nullable: true })
  @Column('jsonb', { nullable: true, name: 'source_system' })
  sourceSystem?: BillSourceSystemData;
}
