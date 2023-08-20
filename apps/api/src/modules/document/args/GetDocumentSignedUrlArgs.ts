import { ArgsType, Field } from '@nestjs/graphql';
import { IsHash, IsUUID } from 'class-validator';
import { EExtension } from '../../aws/misc/EExtension';

@ArgsType()
export class GetDocumentSignedUrlArgs {
  @Field()
  displayName: string;

  @Field()
  @IsHash('sha256')
  hash: string;

  @Field(() => EExtension)
  ext: EExtension;

  @Field()
  @IsUUID()
  workspaceId: string;

  @Field()
  @IsUUID()
  clientId: string;
}
