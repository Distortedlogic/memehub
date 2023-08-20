import { ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EFirmPermission, FirmPermissionNS } from '../modules/user/enums/EFirmPermission';
import { ELobbymaticPermission, LobbymaticPermissionNS } from '../modules/user/enums/ELobbymaticPermission';
import { BasicAuthGuard } from './BasicAuthGuard';

const META_DATA_KEY = 'permission';

interface IPermission {
  lobbymatic?: ELobbymaticPermission;
  firm?: EFirmPermission;
}

export const Permission = (options: IPermission) => SetMetadata(META_DATA_KEY, options);

@Injectable()
export class PermissionGuard extends BasicAuthGuard {
  constructor(readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const { userPassport } = this.getPassport(context);
    if (!userPassport) return false;
    const { firm, lobbymatic } = this.reflector.getAllAndOverride<IPermission>(META_DATA_KEY, [context.getHandler(), context.getClass()]);
    return (
      Boolean(lobbymatic && LobbymaticPermissionNS.gte(userPassport.lobbymaticPermission, lobbymatic)) ||
      Boolean(firm && FirmPermissionNS.gte(userPassport.firmPermission, firm)) ||
      Boolean(lobbymatic && LobbymaticPermissionNS.gte(userPassport.lobbymaticPermission, ELobbymaticPermission.Admin))
    );
  }
}
