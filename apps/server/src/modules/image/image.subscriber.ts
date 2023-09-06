import { Injectable } from "@nestjs/common";
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { EHasImage, ImageEntity } from "./image.entity";

@EventSubscriber()
@Injectable()
export class ImageSubscriber implements EntitySubscriberInterface<ImageEntity> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return ImageEntity;
  }

  async beforeInsert({ entity }: InsertEvent<ImageEntity>) {
    if (!entity.url && !(entity.bucket && entity.eBucketFolder && entity.hash && entity.ext)) throw new Error("where image?");
    if (!Object.values(EHasImage).some((relationId) => relationId)) throw new Error("where relation?");
    entity.url = entity.url || entity.getAwsUrl();
  }
}
