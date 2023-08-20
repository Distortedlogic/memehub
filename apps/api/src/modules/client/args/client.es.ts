import { MappingProperty } from '@elastic/elasticsearch/lib/api/types';
import { ClientEntity } from '../client.entity';

export const ClientEsIndex: Record<keyof ClientEntity, MappingProperty> = {
  id: { type: 'keyword' },
  name: { type: 'text' },
  description: { type: 'text' },
  objective: { type: 'text' },
  createdAt: { type: 'date' },
  firmId: { type: 'keyword' },
  workspaceId: { type: 'keyword' },
};
