import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { NodeColumns } from '../abstracts/node.columns';

@ObjectType()
@Entity('notes')
export class NoteEntity extends NodeColumns {
  @Field()
  @Column()
  note: string;

  @Field()
  @Column('uuid', { name: 'client_id' })
  clientId: string;

  @Field()
  @Column('uuid', { name: 'firm_id' })
  firmId: string;

  @Field()
  @Column('uuid', { name: 'workspace_id' })
  workspaceId: string;
}
