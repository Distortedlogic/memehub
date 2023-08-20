import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@ObjectType()
@Entity('treaty_actions')
export class TreatyActionEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Field(() => Int)
  @Column({ name: 'treaty_num' })
  treatyNum: number;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'action_code' })
  actionCode?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  committee?: string;

  @Field()
  @Column({ name: 'action_date' })
  actionDate: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  type?: string;
}
