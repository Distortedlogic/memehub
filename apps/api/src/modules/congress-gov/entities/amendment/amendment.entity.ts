import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
export class AmendmentAction {
  @Field()
  actionDate: string;

  @Field()
  actionTime: string;

  @Field()
  text: string;
}

@ObjectType()
export class AmendmentBillData {
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
  url: string;
}

@ObjectType()
@Entity('congress_amendments')
export class AmendmentEntity {
  @Field(() => ID)
  @PrimaryColumn()
  number: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  congress: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => AmendmentBillData, { nullable: true })
  @Column('jsonb', { nullable: true, name: 'amended_bill' })
  amendedBill?: AmendmentBillData;

  @Field(() => AmendmentAction, { nullable: true })
  @Column('jsonb', { nullable: true, name: 'latest_action' })
  latestAction?: AmendmentAction;

  @Field()
  @Column({ nullable: true })
  purpose?: string;

  @Field()
  @Column()
  type: string;

  @Field(() => String)
  @Column({ nullable: true, name: 'update_date' })
  updateDate?: Date;

  @Field()
  @Column()
  url: string;
}
