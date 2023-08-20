import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@ObjectType()
@Entity('nomination_committees')
export class NominationCommitteeEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Field(() => Int)
  @Column({ name: 'nomination_number' })
  nominationNumber: number;

  @Field()
  @Column({ name: 'system_code' })
  systemCode: string;

  @Field()
  @Column()
  name: string;
}
