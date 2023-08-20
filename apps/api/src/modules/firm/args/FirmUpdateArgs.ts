import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class FirmUpdateArgs {
  @Field()
  @IsUUID()
  id: string;
  @Field()
  @IsNotEmpty()
  name: string;
}
