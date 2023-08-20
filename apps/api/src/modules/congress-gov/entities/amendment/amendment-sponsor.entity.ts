import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@ObjectType()
@Entity('amendment_sponsors')
export class AmendmentSponsorEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Field()
  @Column({ name: 'amendment_number' })
  amendmentNumber: string;

  @Field()
  @Column({ name: 'bioguide_id' })
  bioguideId: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'first_name' })
  firstName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'full_name' })
  fullName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'last_name' })
  lastName?: string;
}
