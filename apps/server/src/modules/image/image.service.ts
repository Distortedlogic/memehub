import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { AwsService } from "../../../external/aws/aws.service";
import { awsEnvironment } from "../../../internal/config/keys/aws.config";
import { RedisOmService } from "../../../internal/redis/redis.service";
import { EHasImage } from "./image.entity";
import { ImageRepo } from "./image.repo";

@Injectable()
export class ImageService {
  constructor(
    @Inject(awsEnvironment.KEY)
    private readonly awsEnv: ConfigType<typeof awsEnvironment>,
    @InjectRepository(ImageRepo)
    public readonly repo: ImageRepo,
    private readonly redisOmService: RedisOmService,
    private readonly awsService: AwsService
  ) {}

  async getImageTokenEntity(userId: string) {
    const tokenEntity = await this.redisOmService.getSignedUrlToken(userId);
    if (!tokenEntity) throw new Error("Cant find token entity");
    if (!(await this.awsService.checkFileExists({ Key: tokenEntity.createAwsKey() }))) throw new Error("file doesnt exists on AWS");
    return tokenEntity;
  }

  async getImageFromToken({ userId }: { userId: string }) {
    const { eBucketFolder, ext, hash } = await this.getImageTokenEntity(userId);
    return this.repo.create({ bucket: this.awsEnv.bucket, eBucketFolder, hash, ext });
  }

  async createAndSaveImageFromToken({ userId }: { userId: string }) {
    const { eBucketFolder, ext, hash } = await this.getImageTokenEntity(userId);
    return this.repo.createAndSave({ bucket: this.awsEnv.bucket, eBucketFolder, hash, ext });
  }

  async saveImageFromToken({ userId, relation }: { userId: string; relation?: { relationId: string; eImageRelationId: EHasImage } }) {
    const { eBucketFolder, ext, hash } = await this.getImageTokenEntity(userId);
    const entityLike = { bucket: this.awsEnv.bucket, eBucketFolder, hash, ext };
    return this.repo.findOneOrCreate({
      findOpts: { where: { hash } },
      entityLike: relation ? { [relation.eImageRelationId]: relation.relationId, ...entityLike } : entityLike,
    });
  }
}
