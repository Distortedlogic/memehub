import { Query, Resolver } from '@nestjs/graphql';
import { TimezoneDTO } from './dto/timezoneDTO';
import { timezoneMapping } from './timezoneMapping';

@Resolver('Timezones')
export class TimezoneResolver {
  @Query(() => [TimezoneDTO])
  getTimezones(): TimezoneDTO[] {
    return Object.values(timezoneMapping);
  }
}
