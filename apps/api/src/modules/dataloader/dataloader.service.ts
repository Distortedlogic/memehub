import { Injectable } from '@nestjs/common';
import { IUserPassport } from '../../interfaces/IUserPassport';
import { FirmAvatarDataloader, IFirmAvatarDataLoaders } from '../firm/firm-avatar.loader';
import { IUserAvatarDataLoaders, UserAvatarDataloader } from '../user/user-avatar.loader';
import { IWorkspaceDataloader, WorkspaceDataloader } from '../workspace/workspace.loader';

export interface IDataLoaders {
  userAvatar: IUserAvatarDataLoaders;
  firmAvatar: IFirmAvatarDataLoaders;
  workspace: IWorkspaceDataloader;
}

@Injectable()
export class DataloaderService {
  constructor(
    private readonly userAvatarDataloader: UserAvatarDataloader,
    private readonly firmAvatarDataloader: FirmAvatarDataloader,
    private readonly workspaceDataloader: WorkspaceDataloader,
  ) {}

  dataloaders(userPassport?: IUserPassport): IDataLoaders {
    return {
      userAvatar: this.userAvatarDataloader.dataloaders(userPassport),
      firmAvatar: this.firmAvatarDataloader.dataloaders(userPassport),
      workspace: this.workspaceDataloader.dataloaders(userPassport),
    };
  }
}
