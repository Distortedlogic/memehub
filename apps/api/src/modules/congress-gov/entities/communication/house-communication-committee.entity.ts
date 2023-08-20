import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@ObjectType()
@Entity('house_communication_committees')
export class HouseCommunicationCommitteeEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Field(() => Int)
  @Column({ name: 'communication_number' })
  communicationNumber: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ name: 'referral_date' })
  referralDate: string;

  @Field()
  @Column({ name: 'system_code' })
  systemCode: string;
}
