import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { NodeColumns } from '../../abstracts/node.columns';

@ObjectType()
@Entity('credit')
export class CreditEntity extends NodeColumns {
  @Field()
  @Column({ name: 'amount' })
  amount: number;

  @Field()
  @Column({ name: 'balance', nullable: true })
  balance?: string;

  @Field()
  @Column()
  status: string;

  @Field()
  @Column({ name: 'status_url' })
  statusUrl: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({ name: 'allow_negative' })
  allowNegative: boolean;
}
