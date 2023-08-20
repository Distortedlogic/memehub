import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity('congress_hearings')
export class CongressHearingEntity {
  @Field(() => ID)
  @PrimaryColumn({ name: 'jacket_number' })
  jacketNumber: number;

  @Field()
  @Column()
  chamber: 'House' | 'Senate';

  @Field(() => Int)
  @Column()
  congress: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  number?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  part?: number;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'update_date' })
  updateDate?: string;

  @Field()
  @Column()
  url: string;
}
