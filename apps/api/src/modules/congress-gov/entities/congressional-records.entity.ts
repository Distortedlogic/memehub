import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
export class LinksFileData {
  @Field()
  Part: string;

  @Field()
  Url: string;
}

@ObjectType()
export class LinksInnerData {
  @Field()
  Label: string;

  @Field()
  Ordinal: string;

  @Field(() => [LinksFileData])
  PDF: LinksFileData[];
}

@ObjectType()
export class LinksData {
  @Field(() => LinksInnerData)
  Digest: LinksInnerData;

  @Field(() => LinksInnerData)
  FullRecord: LinksInnerData;

  @Field(() => LinksInnerData)
  House: LinksInnerData;

  @Field(() => LinksInnerData)
  Remarks: LinksInnerData;

  @Field(() => LinksInnerData)
  Senate: LinksInnerData;
}

@ObjectType()
@Entity('congressional_records')
export class CongressionalRecordEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  issue: string;

  @Field()
  @Column()
  congress: string;

  @Field(() => LinksData)
  @Column('jsonb')
  links: LinksData;

  @Field(() => String)
  @Column({ name: 'publish_date' })
  publishDate: string;

  @Field()
  @Column()
  session: string;

  @Field()
  @Column()
  volume: string;
}
