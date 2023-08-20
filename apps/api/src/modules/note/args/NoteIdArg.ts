import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class NoteIdArg {
  @Field()
  @IsUUID()
  noteId: string;
}
