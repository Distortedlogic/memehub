import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class UserIdArg {
  @Field()
  @IsUUID()
  userId: string;
}
