import { UseGuards } from '@nestjs/common';
import { Args, ArgsType, Mutation, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPassport } from '../../decorators/userPassport';
import { BasicAuthGuard } from '../../guards/BasicAuthGuard';
import { IUserPassport } from '../../interfaces/IUserPassport';
import { VoteEntity } from './vote.entity';
import { VoteArgs } from './vote.resolver.args';

@ArgsType()
@Resolver()
export class VoteResolver {
  constructor(
    @InjectRepository(VoteEntity)
    private readonly voteRepo: Repository<VoteEntity>,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(BasicAuthGuard)
  async vote(@UserPassport() { userId }: IUserPassport, @Args() { votableId, upvote, eVotable }: VoteArgs): Promise<boolean> {
    if (await this.voteRepo.count({ where: { userId, eVotable, [eVotable]: votableId } })) return false;
    await this.voteRepo.save({ upvote, userId, eVotable, [eVotable]: votableId });
    return true;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
