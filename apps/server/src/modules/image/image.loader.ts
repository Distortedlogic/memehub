import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { IUserPassport } from '../../interfaces/IUserPassport';
import { BaseDataloaderService, IBaseDataLoaders } from '../common/generics/base.loader.g';
import { ImageEntity } from './image.entity';

export interface IImageDataLoaders extends IBaseDataLoaders<ImageEntity> {
  urlById: DataLoader<string, string>;
}

@Injectable()
export class ImageDataloaderService extends BaseDataloaderService<ImageEntity> {
  constructor(readonly repo: Repository<ImageEntity>) {
    super(repo);
  }

  dataloaders(userPassport?: IUserPassport): IImageDataLoaders {
    userPassport?.userId;
    return {
      ...this.baseDataloaders(userPassport),
      urlById: new DataLoader<string, string>(async (ids) => {
        const entities = await this.repo.findBy({ id: In(ids) });
        const idToUrl = entities.reduce<Record<string, string>>((prev, entity) => ({ [entity.id]: entity.url, ...prev }), {});
        return ids.map((id) => idToUrl[id]);
      }),
    };
  }
}
