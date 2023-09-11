import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { In } from 'typeorm';
import { BaseDataloaderService, IBaseDataLoaders } from '../../../../core/generics/services/base.loader.g';
import { IUserPassport } from '../../../../core/interfaces/IUserPassport';
import { MemeEntity } from '../entities/meme.entity';
import { MemeService } from '../meme.service';

export interface IMemeDataLoaders extends IBaseDataLoaders<MemeEntity> {
  contest: {
    userSubmissionCount: DataLoader<string, number>;
  };
}

@Injectable()
export class MemeDataloaderService extends BaseDataloaderService<MemeEntity> {
  constructor(readonly memeService: MemeService) {
    super(memeService);
  }

  dataloaders(userPassport?: IUserPassport): IMemeDataLoaders {
    const userId = userPassport?.userId;
    return {
      ...this.baseDataloaders(userPassport),
      contest: {
        userSubmissionCount: new DataLoader(async (ids) => {
          const memes = await this.memeService.repo.find({ where: { contestId: In([...ids]), userId } });
          const contestIdToSubmissionCount = memes.reduce<Record<string, number>>(
            (prev, meme) => ({ ...prev, [meme.contestId!]: prev[meme.contestId!] ? prev[meme.contestId!]++ : 0 }),
            {},
          );
          return ids.map((id) => contestIdToSubmissionCount[id] ?? 0);
        }),
      },
    };
  }
}
