import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';

@ArgsType()
export class TaskSearchArgs {
  @Field()
  @IsUUID()
  firmId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  workspaceId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  clientId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  assigneeId?: string;
}
