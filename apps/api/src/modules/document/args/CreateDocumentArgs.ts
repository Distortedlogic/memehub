import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class CreateDocumentArgs {
  @Field()
  @IsUUID()
  firmId: string;

  @Field()
  @IsUUID()
  workspaceId: string;

  @Field()
  @IsUUID()
  clientId: string;
}
