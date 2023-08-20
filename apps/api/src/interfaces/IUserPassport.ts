import { EFirmPermission } from '../modules/user/enums/EFirmPermission';
import { ELobbymaticPermission } from '../modules/user/enums/ELobbymaticPermission';

export interface IUserPassport {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  lobbymaticPermission?: ELobbymaticPermission;
  firmPermission?: EFirmPermission;
  firmId: string;
  timezone: string;
}
