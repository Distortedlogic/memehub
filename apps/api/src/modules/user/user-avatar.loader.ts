import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { BaseDataloaderService, IBaseDataLoaders } from '../../generics/base.loader.g';
import { IUserPassport } from '../../interfaces/IUserPassport';
import { UserAvatarEntity } from './entities/user-avatar.entity';

export interface IUserAvatarDataLoaders extends IBaseDataLoaders<UserAvatarEntity> {
  urlById: DataLoader<string, string>;
}

@Injectable()
export class UserAvatarDataloader extends BaseDataloaderService<UserAvatarEntity> {
  constructor(
    @InjectRepository(UserAvatarEntity)
    readonly userAvatarRepo: Repository<UserAvatarEntity>,
  ) {
    super(userAvatarRepo);
  }

  dataloaders(userPassport?: IUserPassport): IUserAvatarDataLoaders {
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
