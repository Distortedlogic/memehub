import { Injectable } from '@nestjs/common';
import { IUserPassport } from '../../interfaces/IUserPassport';
import { IUserAvatarDataLoaders, UserAvatarDataloader } from '../user/user-avatar.loader';

export interface IDataLoaders {
  userAvatar: IUserAvatarDataLoaders;
}

@Injectable()
export class DataloaderService {
  constructor(private readonly userAvatarDataloader: UserAvatarDataloader) {}

  dataloaders(userPassport?: IUserPassport): IDataLoaders {
    return {
      userAvatar: this.userAvatarDataloader.dataloaders(userPassport),
    };
  }
}
