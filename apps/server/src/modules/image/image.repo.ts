import { faker } from "@faker-js/faker";
import { EntityRepository } from "typeorm";
import { CustomRepo } from "../../../../core/generics/repos/custom.repo.g";
import { EHasImage, ImageEntity } from "./image.entity";

@EntityRepository(ImageEntity)
export class ImageRepo extends CustomRepo<ImageEntity> {
  fakeOne(parentEntity?: { id: string; eImageRelationId: EHasImage }) {
    return parentEntity
      ? this.createAndSave({ [parentEntity.eImageRelationId]: parentEntity.id, url: faker.image.imageUrl() })
      : this.createAndSave({ url: faker.image.imageUrl() });
  }
}
