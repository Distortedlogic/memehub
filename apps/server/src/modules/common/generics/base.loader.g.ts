import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { IUserPassport } from '../../../interfaces/IUserPassport';

interface INodeColumn {
  id: string;
}

export interface IBaseDataLoaders<TEntity extends INodeColumn> {
  byId: DataLoader<string, TEntity>;
}

@Injectable()
export abstract class BaseDataloaderService<TEntity extends INodeColumn> {
  constructor(readonly repo: Repository<TEntity>) {}

  baseDataloaders(_userPassport?: IUserPassport): IBaseDataLoaders<TEntity> {
    return {
      byId: new DataLoader<string, TEntity>(async (ids) => {
        const entities = await this.repo.findBy({ id: In(ids) as any });
        const idToEntity = entities.reduce<Record<string, TEntity>>((prev, entity) => ({ [entity.id]: entity, ...prev }), {});
        return ids.map((id) => idToEntity[id]);
      }),
    };
  }
}
