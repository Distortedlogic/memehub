import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { NoteIdArg } from './NoteIdArg';

@ArgsType()
export class NoteUpdateArgs extends NoteIdArg {
  @Field()
  @IsNotEmpty()
  note: string;
}
