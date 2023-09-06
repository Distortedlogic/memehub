import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { VotableColumns, VotableEntity } from '../common/columns/votable';
import { EVotable } from './EVotable';

@Injectable()
export class VoteService {
  constructor() {}

  private readonly eVotableToChildRepo: Record<EVotable, Repository<any>> = {};

  getChildRepo<TEntity extends VotableColumns = VotableColumns>(eVotable: EVotable): Repository<TEntity> {
    return this.eVotableToChildRepo[eVotable];
  }

  async incrementVotes<TEntity extends VotableColumns = VotableColumns>({
    repo,
    id,
    upvote,
  }: {
    repo: Repository<TEntity>;
    id: string;
    upvote: boolean;
  }) {
    const item = await repo.findOneByOrFail({ id });
    if (upvote) item.ups++;
    else item.downs++;
    if (!item.contestId || item.ups > 20) item.setRatio();
    await this.save(item as DeepPartial<Entity>, {});
    return item;
  }
}
