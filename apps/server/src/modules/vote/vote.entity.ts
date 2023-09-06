import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { CreatedAtColumn } from '../common/columns/created-at';
import { EVotable } from './EVotable';

@ObjectType()
@Entity('votes')
export class VoteEntity extends CreatedAtColumn {
  @Field(() => Boolean)
  @Column({ name: 'is_upvote' })
  isUpvote: boolean;

  @Field(() => EVotable)
  @Column({ name: 'e_votable', enum: EVotable })
  eVotable: EVotable;

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @Field()
  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Field({ nullable: true })
  @Column('uuid', { name: EVotable.MEME.toSnake(), nullable: true })
  [EVotable.MEME]?: string;

  @Field({ nullable: true })
  @Column('uuid', { name: EVotable.COMMENT.toSnake(), nullable: true })
  [EVotable.COMMENT]?: string;

  @Field({ nullable: true })
  @Column('uuid', { name: EVotable.CONTEST.toSnake(), nullable: true })
  [EVotable.CONTEST]?: string;

  @Field({ nullable: true })
  @Column('uuid', { name: EVotable.FEEDBACK.toSnake(), nullable: true })
  [EVotable.FEEDBACK]?: string;

  @Field({ nullable: true })
  @Column('uuid', { name: EVotable.TEMPLATE.toSnake(), nullable: true })
  [EVotable.TEMPLATE]?: string;
}
