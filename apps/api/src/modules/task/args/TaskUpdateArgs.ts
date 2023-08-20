import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { ETaskStatus } from '../enums/ETaskStatus';
import { TaskIdArgs } from './TaskIdArgs';

@ArgsType()
export class TaskUpdateArgs extends TaskIdArgs {
  @Field()
  @IsNotEmpty()
  objective: string;

  @Field()
  description: string;

  @Field(() => ETaskStatus)
  status: ETaskStatus;

  @Field(() => String)
  dueDate: Date;
}
