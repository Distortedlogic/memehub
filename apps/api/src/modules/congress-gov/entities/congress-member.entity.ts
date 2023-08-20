import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
class SenateTermDTO {
  @Field(() => Int, { nullable: true })
  end?: number;

  @Field(() => Int)
  start: number;
}

@ObjectType()
class HouseTermDTO {
  @Field(() => Int, { nullable: true })
  end?: number;

  @Field(() => Int)
  start: number;
}

@ObjectType()
class ServedDTO {
  @Field(() => [SenateTermDTO], { nullable: true })
  Senate?: SenateTermDTO[];

  @Field(() => [HouseTermDTO], { nullable: true })
  House?: HouseTermDTO[];
}

@ObjectType()
class DepictionData {
  @Field({ nullable: true })
  attribution?: string;

  @Field({ nullable: true })
  imageUrl?: string;
}

@ObjectType()
class TermsItemsData {
  @Field({ nullable: true })
  chamber?: string;

  @Field(() => Int, { nullable: true })
  endYear?: number;

  @Field(() => Int, { nullable: true })
  startYear?: number;
}

@ObjectType()
class TermsData {
  @Field(() => [TermsItemsData], { nullable: true })
  item?: TermsItemsData[];
}

@ObjectType()
@Entity('congress_members')
export class CongressMemberEntity {
  @Field(() => ID)
  @PrimaryColumn({ name: 'bioguide_id' })
  bioguideId: string;

  @Field(() => DepictionData, { nullable: true })
  @Column('jsonb', { nullable: true })
  depiction?: DepictionData;

  @Field({ nullable: true })
  @Column({ nullable: true })
  district?: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'party_name' })
  partyName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  party?: string;

  @Field(() => ServedDTO, { nullable: true })
  @Column('jsonb', { nullable: true })
  served?: ServedDTO;

  @Field(() => TermsData, { nullable: true })
  @Column('jsonb', { nullable: true })
  terms?: TermsData;

  @Field()
  @Column()
  state: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'update_date' })
  updateDate?: string;

  @Field()
  @Column()
  url: string;
}
