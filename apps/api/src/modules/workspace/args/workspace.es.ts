import { MappingProperty } from '@elastic/elasticsearch/lib/api/types';
import { WorkspaceEntity } from '../workspace.entity';

export const WorkspaceEsIndex: Record<keyof WorkspaceEntity, MappingProperty> = {
  id: { type: 'keyword' },
  name: { type: 'text' },
  createdAt: { type: 'date' },
  firmId: { type: 'keyword' },
};
