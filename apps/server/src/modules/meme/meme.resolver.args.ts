import { ArgsType, Field } from "@nestjs/graphql";
import { IsDateString, IsOptional, IsUUID, Length, Validate } from "class-validator";
import { UUID_VERSION } from "../../../../core/constants/UUID_VERSION";
import { ETimeframe } from "../../../../core/enums/ETimeframe";
import { TakeArg } from "../../../../core/generics/pagination.g";
import { ContestSubmissionLimitConstraint } from "../contest/contest.validators";
import { EVotableOrder } from "./../../../../core/enums/EVotableOrder";
import { PaginatedArgs } from "./../../../../core/generics/pagination.g";

@ArgsType()
export class MemeIdArg {
  @Field()
  @IsUUID(UUID_VERSION)
  memeId: string;
}

@ArgsType()
export class QueryMemesArgs extends PaginatedArgs {
  @Field(() => ETimeframe)
  eTimeframe: ETimeframe;

  @Field(() => EVotableOrder, { nullable: true })
  eVotableOrder?: EVotableOrder;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID(UUID_VERSION)
  userId?: string;
}

@ArgsType()
export class NewMemesArgs extends TakeArg {
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  cursor?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID(UUID_VERSION)
  userId?: string;
}

@ArgsType()
export class PostMemeArgs {
  @Field()
  @Length(6, 50)
  title: string;

  @Field({ nullable: true })
  @IsUUID(UUID_VERSION)
  @Validate(ContestSubmissionLimitConstraint)
  contestId?: string;
}
