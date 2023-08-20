import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class NoteCreateArgs {
  @Field()
  @IsNotEmpty()
  note: string;
  @Field()
  @IsNotEmpty()
  clientId: string;
  @Field()
  @IsNotEmpty()
  workspaceId: string;
}
