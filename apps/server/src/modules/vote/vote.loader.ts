import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { In } from 'typeorm';
import { IUserPassport } from '../../interfaces/IUserPassport';
import { EVotable } from './EVotable';
import { VoteService } from './vote.service';

export type IVoteDataLoaders = Record<EVotable, { hasUpvoted: DataLoader<string, boolean>; hasDownvoted: DataLoader<string, boolean> }>;

@Injectable()
export class VoteDataloaderService {
  constructor(private readonly voteService: VoteService) {}

  private userHasVoted = ({ eVotable, userId, upvote }: { eVotable: EVotable; userId?: string; upvote: boolean }) =>
    new DataLoader<string, boolean>(async (ids) => {
      if (!userId) return Array(ids.length).fill(false);
      const votes = await this.voteService.repo.find({ where: { userId, [eVotable]: In(ids as string[]), upvote } });
      const idToHasVote = votes.reduce<Record<string, boolean>>((prev, vote) => ({ [vote[eVotable] as string]: true, ...prev }), {});
      return ids.map((id) => Boolean(idToHasVote[id]));
    });

  dataloaders(userPassport?: IUserPassport): IVoteDataLoaders {
    const userId = userPassport?.userId;
    return Object.values(EVotable).reduce(
      (prev, eVotable) => ({
        [eVotable]: {
          hasUpvoted: this.userHasVoted({ eVotable, upvote: true, userId }),
          hasDownvoted: this.userHasVoted({ eVotable, upvote: false, userId }),
        },
        ...prev,
      }),
      {} as IVoteDataLoaders,
    );
  }
}
