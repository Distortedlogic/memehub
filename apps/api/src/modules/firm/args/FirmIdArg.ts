import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class FirmIdArg {
  @Field()
  @IsUUID()
  firmId: string;
}
