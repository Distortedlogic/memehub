import { UnauthorizedException } from '@nestjs/common';
import { FieldMiddleware } from '@nestjs/graphql';
import { EFirmPermission, FirmPermissionNS } from '../modules/user/enums/EFirmPermission';
import { ELobbymaticPermission, LobbymaticPermissionNS } from '../modules/user/enums/ELobbymaticPermission';

export const PermissionFieldMiddleware: (options: { lobbymatic?: ELobbymaticPermission; firm?: EFirmPermission }) => FieldMiddleware =
  ({ firm, lobbymatic }) =>
  async (ctx, next) => {
    if (
      (lobbymatic && LobbymaticPermissionNS.gte(lobbymatic, ctx.context.req.user.lobbymaticPermission)) ||
      (firm && FirmPermissionNS.gte(firm, ctx.context.req.user.lobbymaticPermission))
    ) {
      return next();
    } else {
      throw new UnauthorizedException();
    }
  };
