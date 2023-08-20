import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { UserPassport } from '../../decorators/userPassport';
import { BasicAuthGuard } from '../../guards/BasicAuthGuard';
import { IUserPassport } from '../../interfaces/IUserPassport';
import { TaskCreateArgs } from './args/TaskCreateArgs';
import { TaskIdArgs } from './args/TaskIdArgs';
import { TaskSearchArgs } from './args/TaskSearchArgs';
import { TaskUpdateArgs } from './args/TaskUpdateArgs';
import { ETaskStatus } from './enums/ETaskStatus';
import { TaskEntity } from './task.entity';

@Resolver(TaskEntity)
@UseGuards(BasicAuthGuard)
export class TaskResolver {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly repo: Repository<TaskEntity>,
  ) {}

  @Query(() => [TaskEntity])
  getTasks(@Args() { firmId, assigneeId, workspaceId, clientId }: TaskSearchArgs): Promise<TaskEntity[]> {
    const query = this.repo
      .createQueryBuilder('task')
      .where('firm_id = :firmId', { firmId })
      .orderBy('due_date', 'ASC')
      .where('(status != :status OR created_at >= :past)', { status: ETaskStatus.Completed, past: dayjs().subtract(7, 'days').toDate() });
    if (workspaceId) query.andWhere('workspace_id = :workspaceId', { workspaceId });
    if (clientId) query.andWhere('client_id = :clientId', { clientId });
    if (assigneeId) query.andWhere('assignee_id = :assigneeId', { assigneeId });
    return query.getMany();
  }

  @Query(() => TaskEntity)
  getTask(@Args() args: TaskIdArgs): Promise<TaskEntity> {
    return this.repo.findOneByOrFail({ id: args.taskId });
  }

  @Mutation(() => TaskEntity)
  createTask(@UserPassport() { firmId }: IUserPassport, @Args() task: TaskCreateArgs) {
    return this.repo.save({ firmId, ...task });
  }

  @Mutation(() => TaskEntity)
  updateTask(@Args() { taskId, objective, description, status, dueDate }: TaskUpdateArgs) {
    return this.repo.save({ id: taskId, objective, description, status, dueDate });
  }

  @Mutation(() => TaskEntity)
  async deleteTask(@Args() { taskId }: TaskIdArgs) {
    await this.repo.delete(taskId);
    return taskId;
  }
}
