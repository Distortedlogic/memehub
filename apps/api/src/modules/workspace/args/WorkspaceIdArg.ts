import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class WorkspaceIdArg {
  @Field()
  @IsUUID()
  workspaceId: string;
}