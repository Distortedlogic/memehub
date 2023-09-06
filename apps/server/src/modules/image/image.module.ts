import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AwsModule } from "../../../external/aws/aws.module";
import { awsEnvironment } from "../../../internal/config/keys/aws.config";
import { RedisOmModule } from "../../../internal/redis/redis.module";
import { ImageDataloaderService } from "./image.loader";
import { ImageRepo } from "./image.repo";
import { ImageResolver } from "./image.resolver";
import { ImageService } from "./image.service";
import { ImageSubscriber } from "./image.subscriber";

@Module({
  imports: [ConfigModule.forRoot({ load: [awsEnvironment] }), TypeOrmModule.forFeature([ImageRepo]), RedisOmModule, AwsModule],
  providers: [ImageService, ImageResolver, ImageDataloaderService, ImageSubscriber],
  exports: [ImageService, ImageDataloaderService],
})
export class ImageModule {}
