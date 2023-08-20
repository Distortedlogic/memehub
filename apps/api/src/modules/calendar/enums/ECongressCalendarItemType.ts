import { registerEnumType } from '@nestjs/graphql';

export enum ECongressCalendarItemType {
  Holiday = 'Holiday',
  Senate = 'Senate',
  House = 'House',
  Both = 'Both',
}
registerEnumType(ECongressCalendarItemType, { name: 'ECongressCalendarItemType' });
