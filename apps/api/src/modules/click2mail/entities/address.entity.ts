import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { NodeColumns } from '../../abstracts/node.columns';

@ObjectType()
export class UserData {
  @Field()
  prefix: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  suffix: string;
}

@ObjectType()
export class billingAddressData {
  @Field()
  description: string;

  @Field()
  replyCity: string;

  @Field()
  replyRegion: string;

  @Field()
  permitNumber: string;

  @Field()
  isDefault: string;

  @Field()
  organization: string;

  @Field()
  address1: string;

  @Field()
  address2: string;

  @Field()
  address3: number;

  @Field()
  phone: number;

  @Field(() => UserData)
  name: UserData;

  @Field()
  city: number;

  @Field()
  state: number;

  @Field()
  country: number;

  @Field()
  zip: number;

  @Field()
  addressId: string;
}

@ObjectType()
@Entity('address')
export class AddressEntity extends NodeColumns {
  @Field(() => billingAddressData)
  @Column('jsonb', { name: 'billing_address' })
  billingAddress: [billingAddressData];

  @Field()
  @Column({ name: 'address_type' })
  addressType: string;

  @Field()
  @Column({ name: 'address_id' })
  addressId: string;
}
