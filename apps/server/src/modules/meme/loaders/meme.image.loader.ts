import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { IUserPassport } from '../../../interfaces/IUserPassport';
import { BaseDataloaderService, IBaseDataLoaders } from '../../common/generics/base.loader.g';
import { MemeImageEntity } from '../entities/meme.image.entity';

export interface IMemeImageDataLoaders extends IBaseDataLoaders<MemeImageEntity> {
  urlById: DataLoader<string, string>;
}

@Injectable()
export class MemeImageDataloaderService extends BaseDataloaderService<MemeImageEntity> {
  constructor(readonly repo: Repository<MemeImageEntity>) {
    super(repo);
  }

  dataloaders(userPassport?: IUserPassport): IMemeImageDataLoaders {
    userPassport?.userId;
    return {
      ...this.baseDataloaders(userPassport),
      urlById: new DataLoader<string, string>(async (ids) => {
        const entities = await this.repo.findBy({ id: In(ids) });
        const idToUrl = entities.reduce<Record<string, string>>((prev, entity) => ({ [entity.id]: entity.getAwsUrl(), ...prev }), {});
        return ids.map((id) => idToUrl[id]);
      }),
    };
  }
}
