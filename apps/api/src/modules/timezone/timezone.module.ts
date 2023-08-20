import { Module } from '@nestjs/common';
import { TimezoneController } from './timezone.controller';
import { TimezoneResolver } from './timezone.resolver';

@Module({
  imports: [],
  providers: [TimezoneResolver],
  exports: [],
  controllers: [TimezoneController],
})
export class TimezoneModule {}
