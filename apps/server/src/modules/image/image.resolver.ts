import { UseGuards } from "@nestjs/common";
import { Args, ArgsType, Field, Mutation, Resolver } from "@nestjs/graphql";
import { IsHash, IsIn } from "class-validator";
import { UserPassport } from "../../../../core/decorators/userPassport";
import { EBucketFolder } from "../../../../core/enums/EBucketFolder";
import { IUserPassport } from "../../../../core/interfaces/IUserPassport";
import { AwsService } from "../../../external/aws/aws.service";
import { BasicAuthGuard } from "../../../internal/guards/BasicAuthGuard";
import { RedisOmService } from "../../../internal/redis/redis.service";

@ArgsType()
class GetSignedUrlArgs {
  @Field(() => EBucketFolder)
  eBucketFolder: EBucketFolder;

  @Field()
  @IsHash("sha256")
  hash: string;

  @Field()
  @IsIn(["png", "jpeg", "gif"])
  ext: string;
}

@Resolver()
export class ImageResolver {
  constructor(private readonly awsService: AwsService, private readonly redisOmService: RedisOmService) {}

  @Mutation(() => String, { nullable: true })
  @UseGuards(BasicAuthGuard)
  async getSignedUrl(@UserPassport() { userId }: IUserPassport, @Args() { eBucketFolder, hash, ext }: GetSignedUrlArgs) {
    await this.redisOmService.setSignedUrlToken({ userId, eBucketFolder, hash, ext });
    return this.awsService.getSignedUrl({ Key: `${eBucketFolder}/${hash}.${ext}`, ContentType: `image/${ext}` });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
