import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { NodeColumns } from '../abstracts/node.columns';
import { ETaskStatus } from './enums/ETaskStatus';

@ObjectType()
@Entity('tasks')
export class TaskEntity extends NodeColumns {
  @Field()
  @Column({ length: 1_000 })
  objective: string;

  @Field()
  @Column({ length: 1_000 })
  description: string;

  @Field(() => ETaskStatus)
  @Column({ enum: ETaskStatus, type: 'enum' })
  status: ETaskStatus;

  @Field()
  @Column('uuid', { name: 'client_id' })
  clientId: string;

  @Field()
  @Column('uuid', { name: 'workspace_id' })
  workspaceId: string;

  @Field()
  @Column('uuid', { name: 'firm_id' })
  firmId: string;

  @Field({ nullable: true })
  @Column('uuid', { name: 'assignee_id', nullable: true })
  assigneeId?: string;

  @Field(() => String)
  @Column({ name: 'due_date', type: 'timestamp with time zone', nullable: true })
  dueDate: Date;
}
