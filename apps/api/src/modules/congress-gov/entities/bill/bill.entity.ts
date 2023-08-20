import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
export class BillAction {
  @Field()
  actionDate: string;

  @Field()
  text: string;
}

@ObjectType()
@Entity('congress_bills')
export class BillEntity {
  @Field(() => ID)
  @PrimaryColumn()
  number: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  congress: number;

  @Field(() => BillAction)
  @Column('jsonb', { name: 'latest_action' })
  latestAction: BillAction;

  @Field()
  @Column({ name: 'origin_chamber' })
  originChamber: string;

  @Field()
  @Column({ name: 'origin_chamber_code' })
  originChamberCode: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column({ nullable: true, name: 'update_date' })
  updateDate?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'introduced_date' })
  introducedDate?: string;

  @Field()
  @Column({ name: 'update_date_including_text' })
  updateDateIncludingText: string;

  @Field()
  @Column()
  url: string;
}
