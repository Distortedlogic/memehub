import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CreatedAtColumn } from '../../abstracts/created-at.column';

@ObjectType()
@Entity('address_list')
export class AddressListEntity extends CreatedAtColumn {
  @Field(() => ID)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ name: 'address_list_id' })
  addressListId: number;

  @Field()
  @Column()
  status: number;

  @Field()
  @Column({ name: 'status_location' })
  statusLocation: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({ name: 'address_list_name' })
  addressListName: string;

  @Field()
  @Column({ name: 'first_name' })
  firstname: string;

  @Field()
  @Column({ name: 'last_name' })
  lastname: string;

  @Field()
  @Column()
  organization: string;

  @Field()
  @Column()
  address1: string;

  @Field()
  @Column()
  address2: string;

  @Field()
  @Column()
  address3: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  state: string;

  @Field()
  @Column()
  postalcode: string;
}
