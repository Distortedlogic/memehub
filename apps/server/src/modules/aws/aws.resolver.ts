import { Query, Resolver } from '@nestjs/graphql';
import { EContentType } from './misc/EContentType';

@Resolver()
export class AwsResolver {
  @Query(() => [EContentType])
  getS3ContentTypes() {
    return Object.values(EContentType);
  }
}
