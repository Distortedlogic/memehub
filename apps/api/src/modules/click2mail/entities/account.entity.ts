import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { NodeColumns } from '../../abstracts/node.columns';

@ObjectType()
@Entity('account')
export class AccountEntity extends NodeColumns {
  @Field()
  @Column({ name: 'username' })
  accountUsername: string;

  @Field()
  @Column({ name: 'password' })
  accountPassword: string;

  @Field()
  @Column({ name: 'email' })
  accountEmail: string;

  @Field()
  @Column({ name: 'name' })
  accountName: string;

  @Field()
  @Column({ name: 'company' })
  accountCompany: string;

  @Field()
  @Column({ name: 'address1' })
  accountAddress1: string;

  @Field()
  @Column({ name: 'address2' })
  accountAddress2: string;

  @Field()
  @Column({ name: 'address3' })
  accountAddress3: number;

  @Field()
  @Column({ name: 'city' })
  accountCity: number;

  @Field()
  @Column({ name: 'state' })
  accountState: number;

  @Field()
  @Column({ name: 'zip' })
  accountZip: number;

  @Field()
  @Column({ name: 'country' })
  accountCountry: number;
}
