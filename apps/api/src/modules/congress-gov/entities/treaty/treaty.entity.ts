import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity('congress_treaties')
export class CongressTreatyEntity {
  @Field(() => ID)
  @PrimaryColumn({ name: 'treaty_num' })
  treatyNum: number;

  @Field(() => Int)
  @Column({ nullable: true, name: 'end_congress_id' })
  endCongressId?: number;

  @Field(() => Int)
  @Column()
  congress: number;

  @Field()
  @Column({ name: 'resolution_text' })
  resolutionText: string;

  @Field()
  @Column()
  parts: string;

  @Field()
  @Column({ name: 'transmitted_date' })
  transmittedDate: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'treaty_subject' })
  treatySubject?: string;

  @Field()
  @Column({ name: 'treaty_suffix' })
  treatySuffix: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'update_date' })
  updateDate?: string;

  @Field()
  @Column()
  url: string;
}
