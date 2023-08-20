import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CongressCalendarItemEntity } from './congress.calendar.entity';
import { CongressCalendarItemResolver } from './congress.calendar.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CongressCalendarItemEntity])],
  providers: [CongressCalendarItemResolver],
  exports: [],
  controllers: [],
})
export class CalendarModule {}
