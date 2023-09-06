import { faker } from '@faker-js/faker';
import { EntityRepository, FindConditions, IsNull, LessThanOrEqual } from 'typeorm';
import { ETimeframe, Timeframe } from '../../../../core/enums/ETimeframe';
import { EVotableOrder } from '../../../../core/enums/EVotableOrder';
import { VotableRepo } from '../../../../core/generics/repos/votable.repo.g';
import { EVotable } from './../../../../core/enums/EVotable';
import { ContestIdPaginatedArgs } from './../contest/contest.resolver.args';
import { MemeEntity } from './entities/meme.entity';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

interface IQueryMemesArgs {
  take: number;
  skip: number;
  eVotableOrder: EVotableOrder;
  userId?: string;
  eTimeframe: ETimeframe;
}

interface IMemeEmojiArgs {
  userId?: string;
  memeId: string;
  limit?: number;
}

export interface IMemeEmojiDTO {
  count: number;
  id: string;
  name: string;
  url: string;
  hasAdded: boolean;
}

@EntityRepository(MemeEntity)
export class MemeRepo extends VotableRepo<MemeEntity> {
  fakeOne({ userId, contestId, imageId }: { userId: string; contestId?: string; imageId: string }) {
    return this.createAndSave({ imageId, contestId, userId, title: faker.lorem.text() });
  }

  hotMemes({ eTimeframe, userId, take, skip }: { eTimeframe: ETimeframe; userId?: string; take: number; skip: number }) {
    const query = this.createQueryBuilder('meme')
      .where('meme.contest_id IS NULL')
      .leftJoin('meme.votes', 'vote')
      .addSelect('COUNT(vote.user_id)', 'count')
      .andWhere('vote.upvote IS TRUE')
      .groupBy('meme.id')
      .addGroupBy(`vote.${EVotable.MEME.toSnake()}`)
      .orderBy('count', 'DESC');
    const days = Timeframe.toInt(eTimeframe);
    if (days) query.andWhere('vote.created_at > :daysAgo', { daysAgo: dayjs.utc().subtract(days, 'd').toDate() });
    if (userId) query.andWhere('meme.user_id = :userId', { userId });
    return query.getPaginatedMany({ take, skip });
  }

  queryMemes({ take, skip, eVotableOrder, userId, eTimeframe }: IQueryMemesArgs) {
    const query = this.createQueryBuilder('meme').where('meme.contest_id IS NULL').orderBy(`meme.${eVotableOrder.toSnake()}`, 'DESC');
    const days = Timeframe.toInt(eTimeframe);
    if (days) query.andWhere('meme.created_at > :daysAgo', { daysAgo: dayjs.utc().subtract(days, 'days').toDate() });
    if (userId) query.andWhere('meme.user_id = :userId', { userId });
    return query.getPaginatedMany({ skip, take });
  }

  newMemes({ take, cursor, userId }: { take: number; cursor?: string; userId?: string }) {
    const where: FindConditions<MemeEntity> = { contestId: IsNull() };
    if (userId) where.userId = userId;
    if (cursor) where.createdAt = LessThanOrEqual(new Date(cursor));
    return this.findPaginated({ where, order: { createdAt: 'DESC' }, take });
  }

  contestMemes({ userId, contestId, skip, take }: ContestIdPaginatedArgs & { userId?: string }) {
    const query = this.createQueryBuilder('meme').where('meme.contest_id = :contestId', { contestId }).orderBy('meme.ratio', 'DESC');
    if (userId)
      query
        .leftJoin('meme.votes', 'vote')
        .addGroupBy('meme.id')
        .addGroupBy('vote.e_votable')
        .addGroupBy('vote.meme_id')
        .having('vote.meme_id IS NULL')
        .orHaving(
          `SUM(CASE vote.userId
          WHEN :userId THEN 1
          ELSE 0
          END) = 0`,
          { userId },
        );
    return query.getPaginatedMany({ skip, take });
  }

  memeEmojis({ userId, memeId, limit = 4 }: IMemeEmojiArgs): Promise<IMemeEmojiDTO[]> {
    const memeEmojisQ = this.createQueryBuilder('meme')
      .where('meme.id=:memeId', { memeId })
      .innerJoin('meme.userMemeEmojis', 'user_meme_emoji')
      .innerJoin('user_meme_emoji.user', 'user')
      .innerJoin('user_meme_emoji.emoji', 'emoji')
      .groupBy('meme.id')
      .addGroupBy('emoji.id')
      .select('emoji.id', 'id')
      .addSelect('emoji.name', 'name')
      .addSelect('COUNT(user_meme_emoji.user_id)', 'count')
      .addSelect("'https://'||emoji.bucket||'.s3.amazonaws.com/'||emoji.bucket_folder||'/'||emoji.name||'.'||emoji.ext", 'url')
      .having("'count' > :min", { min: 0 })
      .orderBy("'count'", 'DESC')
      .limit(limit);
    if (userId)
      memeEmojisQ.addSelect(
        `CASE
          WHEN SUM(CASE user.id
                    WHEN '${userId}' THEN 1
                    ELSE 0
                  END)=1 THEN TRUE
          ELSE FALSE
        END`,
        'hasAdded',
      );
    else memeEmojisQ.addSelect('FALSE', 'hasAdded');
    return memeEmojisQ.getRawMany();
  }
}
