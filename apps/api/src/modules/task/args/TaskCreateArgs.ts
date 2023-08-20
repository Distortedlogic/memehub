import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ETaskStatus } from '../enums/ETaskStatus';

@ArgsType()
export class TaskCreateArgs {
  @Field()
  @IsNotEmpty()
  objective: string;

  @Field()
  description: string;

  @Field(() => ETaskStatus)
  status: ETaskStatus;

  @Field(() => String)
  dueDate: Date;

  @Field()
  @IsUUID()
  clientId: string;

  @Field()
  @IsUUID()
  workspaceId: string;
}
