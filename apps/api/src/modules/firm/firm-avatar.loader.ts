import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { BaseDataloaderService, IBaseDataLoaders } from '../../generics/base.loader.g';
import { IUserPassport } from '../../interfaces/IUserPassport';
import { FirmAvatarEntity } from './entities/firm-avatar.entity';

export interface IFirmAvatarDataLoaders extends IBaseDataLoaders<FirmAvatarEntity> {
  urlById: DataLoader<string, string>;
}

@Injectable()
export class FirmAvatarDataloader extends BaseDataloaderService<FirmAvatarEntity> {
  constructor(
    @InjectRepository(FirmAvatarEntity)
    readonly firmAvatarRepo: Repository<FirmAvatarEntity>,
  ) {
    super(firmAvatarRepo);
  }

  dataloaders(userPassport?: IUserPassport): IFirmAvatarDataLoaders {
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
