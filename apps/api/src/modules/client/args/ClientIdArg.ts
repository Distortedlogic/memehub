import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class ClientIdArg {
  @Field()
  @IsUUID()
  clientId: string;
}
