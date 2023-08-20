import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class TaskIdArgs {
  @Field()
  @IsUUID()
  taskId: string;
}
