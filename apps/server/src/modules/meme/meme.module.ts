import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageModule } from "../../common/image/image.module";
import { ContestModule } from "../contest/contest.module";
import { MemeDataloaderService } from "./meme.loader";
import { MemeRepo } from "./meme.repo";
import { MemeResolver } from "./meme.resolver";
import { MemeService } from "./meme.service";

@Module({
  imports: [TypeOrmModule.forFeature([MemeRepo]), ImageModule, ContestModule],
  providers: [MemeService, MemeResolver, MemeDataloaderService],
  exports: [MemeService, MemeDataloaderService],
})
export class MemeModule {}
