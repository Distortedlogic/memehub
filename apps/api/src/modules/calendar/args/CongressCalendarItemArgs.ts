import { ArgsType, Field } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { ECongressCalendarItemType } from '../enums/ECongressCalendarItemType';

@ArgsType()
export class CongressCalendarItemArgs {
  @Field(() => ECongressCalendarItemType)
  type: ECongressCalendarItemType;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  holiday?: string;

  @Field(() => String)
  @IsDateString()
  date: string;
}
