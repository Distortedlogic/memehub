import { MappingProperty } from '@elastic/elasticsearch/lib/api/types';
import { FirmEntity } from './firm.entity';

export const FirmEsIndex: Record<keyof FirmEntity, MappingProperty> = {
  id: { type: 'keyword' },
  name: { type: 'text' },
  createdAt: { type: 'date' },
  avatarId: { type: 'keyword' },
  addressId: { type: 'keyword' },
};
