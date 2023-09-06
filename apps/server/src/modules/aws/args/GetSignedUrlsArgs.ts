import { ArgsType, Field } from '@nestjs/graphql';
import { IsHash } from 'class-validator';
import { EImageExtension } from '../../aws/misc/EImageExtension';

@ArgsType()
export class GetSignedUrlArgs {
  @Field()
  @IsHash('sha256')
  hash: string;

  @Field(() => EImageExtension)
  ext: EImageExtension;
}
