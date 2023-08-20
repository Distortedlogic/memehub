import { Entity, PrimaryColumn } from 'typeorm';
import { CreatedAtColumn } from '../abstracts/created-at.column';

@Entity('workspace_to_user')
export class WorkspaceToUserEntity extends CreatedAtColumn {
  @PrimaryColumn('uuid', { name: 'user_id' })
  userId: string;

  @PrimaryColumn('uuid', { name: 'firm_id' })
  firmId: string;

  @PrimaryColumn('uuid', { name: 'workspace_id' })
  workspaceId: string;
}
