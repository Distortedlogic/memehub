import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class FirmArgs {
  @Field()
  @IsNotEmpty()
  name: string;
}
