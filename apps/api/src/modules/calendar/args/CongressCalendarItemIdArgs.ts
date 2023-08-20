import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class CongressCalendarItemIdArgs {
  @Field()
  @IsUUID()
  congressCalendarItemId: string;
}
