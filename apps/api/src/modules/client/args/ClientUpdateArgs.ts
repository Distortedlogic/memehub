import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class ClientUpdateArgs {
  @Field()
  @IsUUID()
  id: string;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  objective?: string;
  @Field({ nullable: true })
  workspaceId?: string;
}
