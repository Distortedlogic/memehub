import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class DocumentIdArg {
  @Field()
  @IsUUID()
  documentId: string;
}
