import { registerEnumType } from '@nestjs/graphql';

export enum EFirmPermission {
  Admin = 'admin',
  Manager = 'manager',
  Editor = 'editor',
  Viewer = 'viewer',
}
registerEnumType(EFirmPermission, { name: 'EFirmPermission' });

const eFirmPermissionToNumber: Record<EFirmPermission, number> = {
  [EFirmPermission.Viewer]: 1,
  [EFirmPermission.Editor]: 2,
  [EFirmPermission.Manager]: 3,
  [EFirmPermission.Admin]: 4,
};

export namespace FirmPermissionNS {
  export const gte = (first: EFirmPermission, second: EFirmPermission) => eFirmPermissionToNumber[first] >= eFirmPermissionToNumber[second];
}
