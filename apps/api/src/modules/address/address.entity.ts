import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { NodeColumns } from '../abstracts/node.columns';

@ObjectType()
@Entity('addresses')
export class AddressEntity extends NodeColumns {
  @Field({ nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  address: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address2: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address3: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  state: string;

  @Field()
  @Column()
  zipCode: string;

  @Field()
  @Column()
  country: string;
}
