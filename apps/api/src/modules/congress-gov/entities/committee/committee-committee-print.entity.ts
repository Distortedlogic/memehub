import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@ObjectType()
@Entity('committee_committee_prints')
export class CommitteeCommitteePrintEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Field(() => Int)
  @Column({ name: 'jacket_number' })
  jacketNumber: number;

  @Field()
  @Column({ name: 'system_code' })
  systemCode: string;

  @Field()
  @Column()
  name: string;
}
