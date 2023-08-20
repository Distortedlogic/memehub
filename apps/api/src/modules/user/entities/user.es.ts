import { MappingProperty } from '@elastic/elasticsearch/lib/api/types';
import { UserEntity } from './user.entity';

export const UserEsIndex: Record<keyof UserEntity, MappingProperty> = {
  id: { type: 'keyword' },
  email: { type: 'text' },
  firstName: { type: 'text' },
  lastName: { type: 'text' },
  lobbymaticPermission: { type: 'keyword' },
  firmPermission: { type: 'keyword' },
  emailVerified: { type: 'boolean' },
  password: { type: 'text' },
  timezone: { type: 'keyword' },
  lastLogin: { type: 'date' },
  createdAt: { type: 'date' },
  firmId: { type: 'keyword' },
  avatarId: { type: 'keyword' },
};
