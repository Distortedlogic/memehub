import { registerEnumType } from '@nestjs/graphql';

export enum ELobbymaticPermission {
  Admin = 'admin',
  Manager = 'manager',
  Editor = 'editor',
  Viewer = 'viewer',
}
registerEnumType(ELobbymaticPermission, { name: 'ELobbymaticPermission' });

const eLobbymaticPermissionToNumber: Record<ELobbymaticPermission, number> = {
  [ELobbymaticPermission.Viewer]: 1,
  [ELobbymaticPermission.Editor]: 2,
  [ELobbymaticPermission.Manager]: 3,
  [ELobbymaticPermission.Admin]: 4,
};

export namespace LobbymaticPermissionNS {
  export const gte = (first: ELobbymaticPermission, second: ELobbymaticPermission) =>
    eLobbymaticPermissionToNumber[first] >= eLobbymaticPermissionToNumber[second];
}
