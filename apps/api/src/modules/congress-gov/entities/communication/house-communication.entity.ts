import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
export class HouseCommunicationType {
  @Field()
  code: string;

  @Field()
  name: string;
}

@ObjectType()
@Entity('congress_house_communications')
export class CongressHouseCommunicationEntity {
  @Field(() => ID)
  @PrimaryColumn({ name: 'communication_number' })
  communicationNumber: number;

  @Field()
  @Column()
  chamber: 'House' | 'Senate';

  @Field(() => HouseCommunicationType)
  @Column('jsonb', { name: 'communication_type' })
  communicationType: HouseCommunicationType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  abstract?: string;

  @Field(() => Int)
  @Column({ name: 'congress_number' })
  congressNumber: number;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'update_date' })
  updateDate?: string;

  @Field()
  @Column()
  url: string;
}
