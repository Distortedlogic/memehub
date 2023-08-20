import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

@ArgsType()
export class CreateAddressArgs {
  @Field()
  addressListName: string;

  @Field()
  @IsNotEmpty()
  firstname: string;

  @Field()
  @IsNotEmpty()
  lastname: string;

  @Field()
  @IsNotEmpty()
  organization: string;

  @Field()
  @IsNotEmpty()
  address1: string;

  @Field()
  @IsNotEmpty()
  address2: string;

  @Field()
  @IsNotEmpty()
  address3: string;

  @Field()
  @IsNotEmpty()
  city: string;

  @Field()
  @IsNotEmpty()
  state: string;

  @Field()
  @IsNotEmpty()
  postalcode: string;

  @Field()
  @IsNotEmpty()
  address: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  clientId?: string;
}
