import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TimezoneDTO } from './dto/timezoneDTO';
import { timezoneMapping } from './timezoneMapping';

@Controller('timezones')
@ApiTags('Timezones')
export class TimezoneController {
  @Get()
  @ApiOkResponse({ type: TimezoneDTO, isArray: true })
  getTimezones(): TimezoneDTO[] {
    return Object.values(timezoneMapping);
  }
}
