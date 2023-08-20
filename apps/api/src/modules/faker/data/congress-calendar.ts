import { ECongressCalendarItemType } from '../../calendar/enums/ECongressCalendarItemType';

export const congressCalendar: { type: ECongressCalendarItemType; holiday?: string; date: string }[] = [
  {
    type: ECongressCalendarItemType.Holiday,
    holiday: "New Year's Day",
    date: '2023-01-01',
  },
  {
    type: ECongressCalendarItemType.Senate,
    date: '2023-06-01',
  },
  {
    type: ECongressCalendarItemType.Senate,
    date: '2023-06-02',
  },
  {
    type: ECongressCalendarItemType.House,
    date: '2023-06-05',
  },
  {
    type: ECongressCalendarItemType.Both,
    date: '2023-06-06',
  },
  {
    type: ECongressCalendarItemType.Both,
    date: '2023-06-07',
  },
  {
    type: ECongressCalendarItemType.Both,
    date: '2023-06-08',
  },
  {
    type: ECongressCalendarItemType.Senate,
    date: '2023-06-09',
  },
  {
    type: ECongressCalendarItemType.Both,
    date: '2023-06-12',
  },
  {
    type: ECongressCalendarItemType.Both,
    date: '2023-06-13',
  },
  {
    type: ECongressCalendarItemType.Both,
    date: '2023-06-14',
  },
  {
    type: ECongressCalendarItemType.Both,
    date: '2023-06-15',
  },
  {
    type: ECongressCalendarItemType.Senate,
    date: '2023-06-16',
  },
  {
    type: ECongressCalendarItemType.Holiday,
    holiday: 'Junteeth',
    date: '2023-06-19',
  },
  {
    type: ECongressCalendarItemType.Both,
    date: '2023-06-20',
  },
  {
    type: ECongressCalendarItemType.Both,
    date: '2023-06-21',
  },
  {
    type: ECongressCalendarItemType.Both,
    date: '2023-06-22',
  },
  {
    type: ECongressCalendarItemType.Both,
    date: '2023-06-23',
  },
  {
    type: ECongressCalendarItemType.Holiday,
    holiday: 'Eidal-Adha (Begins)',
    date: '2023-06-28',
  },
  {
    type: ECongressCalendarItemType.Holiday,
    holiday: 'Eidal-Adha (Ends)',
    date: '2023-06-29',
  },
];
