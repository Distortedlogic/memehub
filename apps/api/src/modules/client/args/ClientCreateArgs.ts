import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class ClientCreateArgs {
  @Field()
  @IsNotEmpty()
  name: string;
  @Field()
  @IsNotEmpty()
  description: string;
  @Field()
  @IsNotEmpty()
  objective: string;
  @Field()
  @IsNotEmpty()
  firmId: string;
  @Field()
  @IsNotEmpty()
  workspaceId: string;
}
