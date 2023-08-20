import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
export class SenateCommunicationType {
  @Field()
  code: string;

  @Field()
  name: string;
}

@ObjectType()
@Entity('congress_senate_communications')
export class CongressSenateCommunicationEntity {
  @Field(() => ID)
  @PrimaryColumn()
  number: number;

  @Field()
  @Column()
  chamber: 'House' | 'Senate';

  @Field(() => SenateCommunicationType)
  @Column('jsonb', { name: 'communication_type' })
  communicationType: SenateCommunicationType;

  @Field(() => Int)
  @Column({ type: 'int' })
  congress: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  abstract?: string;

  @Field()
  @Column({ nullable: true, name: 'update_date' })
  updateDate?: string;

  @Field()
  @Column()
  url: string;
}
