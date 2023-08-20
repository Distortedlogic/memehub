import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { Repository } from 'typeorm';
import { UserPassport } from '../../decorators/userPassport';
import { PaginatedArgs } from '../../generics/pagination.g';
import { BasicAuthGuard } from '../../guards/BasicAuthGuard';
import { ISubscriptionContext } from '../../interfaces/ISubscriptionContext';
import { IUserPassport } from '../../interfaces/IUserPassport';
import { ESubscription } from '../../registry/subscription.r';
import { CreateSubscriptionArgs } from './args/CreateSubscriptionArgs';
import { RssSubscriptionIdArgs } from './args/RssSubscriptionIdArgs';
import { RssSubscriptionToUserEntity } from './entities/rss-user.entity';
import { RssEntryEntity } from './entities/rss.entry.entity';
import { RssSubscriptionEntity } from './entities/rss.subscription.entity';
import { RssService } from './rss.service';

@Resolver()
@UseGuards(BasicAuthGuard)
export class RssResolver {
  constructor(
    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
    @InjectRepository(RssSubscriptionEntity)
    private readonly subscriptionRepo: Repository<RssSubscriptionEntity>,
    @InjectRepository(RssSubscriptionToUserEntity)
    private readonly subToUserRepo: Repository<RssSubscriptionToUserEntity>,
    @InjectRepository(RssEntryEntity)
    private readonly entryRepo: Repository<RssEntryEntity>,
    private readonly service: RssService,
  ) {}

  @Query(() => [RssSubscriptionEntity])
  async getAllRssSubscriptions(): Promise<RssSubscriptionEntity[]> {
    return this.subscriptionRepo.find();
  }

  @Query(() => [RssSubscriptionEntity])
  async getMyRssSubs(@UserPassport() { userId }: IUserPassport) {
    return this.subscriptionRepo
      .createQueryBuilder('sub')
      .leftJoin(RssSubscriptionToUserEntity, 'sub_to_user', 'sub.subscription_id = sub_to_user.subscription_id')
      .where('sub_to_user.user_id = :userId', { userId })
      .getMany();
  }

  @Query(() => [RssEntryEntity])
  async getMyRssEntries(@UserPassport() { userId }: IUserPassport, @Args() { skip, take }: PaginatedArgs) {
    return this.entryRepo
      .createQueryBuilder('entry')
      .orderBy('entry.timestamp', 'DESC')
      .leftJoin(RssSubscriptionToUserEntity, 'sub_to_user', 'entry.subscription_id = sub_to_user.subscription_id')
      .where('sub_to_user.user_id = :userId', { userId })
      .take(take)
      .skip(skip)
      .cache(true)
      .getMany();
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @Mutation(() => RssSubscriptionEntity)
  createRssSubscription(@Args() { url }: CreateSubscriptionArgs) {
    return this.service.createSubscription(url);
  }

  @Mutation(() => String)
  deleteRssSubscription(@Args() { subscription_id }: RssSubscriptionIdArgs) {
    return this.service.deleteSubscription(subscription_id);
  }

  @Mutation(() => Boolean)
  async subToRss(@UserPassport() { userId }: IUserPassport, @Args() { subscription_id }: RssSubscriptionIdArgs) {
    if (!(await this.subscriptionRepo.findOne({ select: ['subscription_id'], where: { subscription_id } }))) {
      throw new Error('Subscription Doesnt Exist');
    }
    if (await this.subToUserRepo.findOne({ select: ['userId', 'subscription_id'], where: { userId, subscription_id } })) {
      throw new Error('already subscribed');
    }
    await this.subToUserRepo.save({ subscription_id, userId });
    return true;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @Subscription(() => RssEntryEntity, {
    async filter(this: RssResolver, _payload: RssEntryEntity, _variables: {}, ctx: ISubscriptionContext) {
      const { userId } = ctx.extra.user;
      return Boolean(
        await this.subToUserRepo.findOne({
          select: ['subscription_id'],
          where: { userId },
          cache: true,
        }),
      );
    },
  })
  myRssFeed() {
    return this.pubSub.asyncIterator<RssEntryEntity>(ESubscription.RssFeed);
  }
}
