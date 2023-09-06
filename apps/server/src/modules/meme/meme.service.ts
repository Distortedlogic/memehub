import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageService } from "../../common/image/image.service";
import { MemeRepo } from "./meme.repo";

@Injectable()
export class MemeService {
  constructor(
    @InjectRepository(MemeRepo)
    public readonly repo: MemeRepo,
    private readonly imageService: ImageService
  ) {}

  async fakeOne({ userId,contestId }: { userId: string; contestId?:string }) {
    const image = await this.imageService.repo.fakeOne();
    return this.repo.fakeOne({ imageId: image.id, userId,contestId });
  }
}
