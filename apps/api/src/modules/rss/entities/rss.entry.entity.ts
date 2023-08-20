import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
class Content {
  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  html?: string;
}

@ObjectType()
class Image {
  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  width?: number;

  @Field({ nullable: true })
  height?: number;
}

@ObjectType()
class Author {
  @Field()
  name: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  email?: string;
}

@ObjectType()
class Category {
  @Field()
  term: string;

  @Field()
  scheme: string;

  @Field({ nullable: true })
  label?: string;

  @Field()
  type: string;
}

@ObjectType()
class AdditionalDetails {
  @Field({ nullable: true })
  language?: string;

  @Field(() => [Category])
  categories: Category[];

  @Field(() => [Author])
  authors: Author[];

  @Field({ nullable: true })
  copyright?: string;
}

@ObjectType()
@Entity('rss_entries')
export class RssEntryEntity {
  @Field(() => ID)
  @PrimaryColumn()
  guid: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title?: string;

  @Field()
  @Column()
  link: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => Content)
  @Column({ type: 'json' })
  content: Content;

  @Field(() => Image)
  @Column({ type: 'json' })
  image: Image;

  @Field()
  @Column({ type: 'json', nullable: true })
  additional_details?: AdditionalDetails;

  @Field({ nullable: true })
  @Column({ nullable: true })
  time?: string;

  @Field()
  @Column()
  timestamp: number;

  @Field()
  @Column()
  subscription_id: string;
}
