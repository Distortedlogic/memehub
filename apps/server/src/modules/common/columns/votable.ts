import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';
import { getRatio } from 'utils/getRatio';
import { INodeColumns, NodeColumns } from './node';

export interface IVotableEntity extends INodeColumns {
  ups: number;
  downs: number;
  ratio: number;
  getRatio(): number;
  setRatio(): void;
}

@ObjectType({ isAbstract: true })
export abstract class VotableColumns extends NodeColumns implements IVotableEntity {
  @Field(() => Int)
  @Column({ default: 0 })
  ups: number;

  @Field(() => Int)
  @Column({ default: 0 })
  downs: number;

  @Field(() => Float)
  @Column('float', { default: 1 })
  ratio: number;

  getRatio() {
    return getRatio(this.ups, this.downs);
  }

  setRatio() {
    this.ratio = this.getRatio();
  }
}
