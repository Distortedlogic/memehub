import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { random } from 'lodash';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { RssSubscriptionToUserEntity } from './entities/rss-user.entity';
import { RssEntryEntity } from './entities/rss.entry.entity';
import { RssSubscriptionEntity } from './entities/rss.subscription.entity';
import { RssApi } from './rss.api';

interface IRssResponseGetSubscriptions {
  subscription_id: string;
  info: string;
  type: string;
  feed_url: string;
  paused: boolean;
}

@Injectable()
export class RssService {
  private readonly logger = new Logger(RssService.name);
  rssUrls = [
    'https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml',
    'http://rss.politico.com/playbook.xml',
    'https://feeds.washingtonpost.com/rss/rss_the-fix',
    'http://rss.politico.com/congress.xml',
    'http://rss.politico.com/healthcare.xml',
    'http://rss.politico.com/defense.xml',
    'http://rss.politico.com/energy.xml',
    'https://rss.politico.com/politics-news.xml',
    'http://rss.cnn.com/rss/cnn_allpolitics.rss',
    'https://www.dailymail.co.uk/news/us-congress/index.rss',
    'http://govexec.com/rss/all/',
    'https://federalnewsnetwork.com/category/all-news/feed/',
    'https://www.bloomberg.com/politics/feeds/site.xml',
    'https://feeds.a.dj.com/rss/RSSMarketsMain.xml',
    'https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml',
    'https://api.axios.com/feed/',
    'https://thehill.com/homenews/senate/feed/',
    'https://thehill.com/homenews/house/feed/',
    'https://thehill.com/homenews/administration/feed/',
    'https://thehill.com/homenews/campaign/feed/',
    'https://thehill.com/regulation/feed/',
    'https://thehill.com/lobbying/feed/',
    'https://thehill.com/homenews/media/feed/',
    'https://thehill.com/policy/defense/feed/',
    // 'https://thehill.com/policy/energy-environment/feed/',
    'https://thehill.com/finance/feed/',
    'https://thehill.com/policy/healthcare/feed/',
    'https://thehill.com/policy/technology/feed/',
    'https://thehill.com/policy/transportation/feed/',
    'https://thehill.com/policy/international/feed/',
    // 'https://www.wusa9.com/feeds/syndication/rss/news',
    'https://www.reutersagency.com/feed/?best-topics=political-general&post_type=best',
    'https://www.nextgov.com/rss/all/',
    'https://governmenttechnologyinsider.com/feed/',
    'https://devblogs.microsoft.com/azuregov/feed/',
    'https://www.govpilot.com/blog/rss.xml',
    'https://www.nist.gov/news-events/news/rss.xml',
    'https://www.cio.gov/feed.xml',
  ];

  constructor(
    @InjectRepository(RssSubscriptionEntity)
    private readonly subscriptionRepo: Repository<RssSubscriptionEntity>,
    @InjectRepository(RssEntryEntity)
    private readonly entryRepo: Repository<RssEntryEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(RssSubscriptionToUserEntity)
    private readonly subToUserRepo: Repository<RssSubscriptionToUserEntity>,
    @InjectRepository(RssSubscriptionToUserEntity)
    private readonly rssSubscriptionToUserRepo: Repository<RssSubscriptionToUserEntity>,
    @InjectRepository(RssSubscriptionEntity)
    private readonly rssSubscriptionRepo: Repository<RssSubscriptionEntity>,
    private readonly api: RssApi,
  ) {}

  async seed() {
    this.logger.log('Clearing Rss Db Entites');
    await this.rssSubscriptionToUserRepo.delete({});
    await this.rssSubscriptionRepo.delete({});
    this.logger.log('Reconciling Db with the Online Service');
    await this.reconcile();
    const rssCount = await this.subscriptionRepo.count();
    const take = 5;
    this.logger.log('Subscribing Users to Rss Feeds');
    for (const user of await this.userRepo.find()) {
      for (const rssSub of await this.subscriptionRepo.find({ take, skip: random(0, rssCount - take) })) {
        await this.subToUserRepo.save({ subscription_id: rssSub.subscription_id, userId: user.id });
      }
    }
  }

  async seedFeed({ url, subscription_id }: { url: string; subscription_id: string }) {
    const { entries } = await this.api.parseFeed(url);
    const dbEntries = await this.entryRepo.find({ select: ['guid'], where: { guid: In(entries.map((entry) => entry.guid)) } });
    const dbGuids = dbEntries.reduce<Record<string, boolean>>((prev, entry) => ({ ...prev, [entry.guid]: true }), {});
    const newEntries = entries.reduce<Record<string, RssEntryEntity>>(
      (prev, entry) => (!dbGuids[entry.guid] ? { ...prev, [entry.guid]: entry } : prev),
      {},
    );
    const entriesWithRelation = Object.values(newEntries).map((entry) => ({ ...entry, subscription_id }));
    await this.entryRepo.save(entriesWithRelation);
  }

  async createSubscription(url: string) {
    if (await this.subscriptionRepo.findOne({ select: ['url'], where: { url } })) {
      throw new Error('please handle this exception better');
    }
    if (!(await this.api.validateFeed(url)).valid_feed) {
      throw new Error('please handle this exception better');
    }
    const newSub = await this.api.createSubscription({ url });
    const entity = await this.subscriptionRepo.save(newSub);
    await this.seedFeed({ url, subscription_id: newSub.subscription_id });
    return entity;
  }

  async deleteSubscription(id: string) {
    const { ok } = await this.api.removeSubscription(id);
    if (!ok) throw new Error('didnt work');
    await this.entryRepo.delete({ subscription_id: id });
    await this.subscriptionRepo.delete({ subscription_id: id });
    return id;
  }

  async reconcile() {
    const dbSubs = await this.subscriptionRepo.find({ select: ['subscription_id', 'url'] });
    const dbUrls = dbSubs.reduce<Record<string, string>>((prev, sub) => ({ ...prev, [sub.url]: sub.subscription_id }), {});
    const { subscriptions } = await this.api.getSubscriptions();
    const appSubs = subscriptions.reduce<Record<string, IRssResponseGetSubscriptions>>(
      (prev, sub) => ({ ...prev, [sub.feed_url]: sub }),
      {},
    );
    for (const url of this.rssUrls) {
      const dbId = dbUrls[url];
      const sub = appSubs[url];
      if (!dbId && !sub) {
        await this.createSubscription(url);
      } else if (!dbId && sub) {
        await this.subscriptionRepo.save({
          feed_type: sub.type,
          info: sub.info,
          status: sub.paused ? 'paused' : 'active',
          subscription_id: sub.subscription_id,
          url: sub.feed_url,
          webhook_url: '',
        });
        await this.seedFeed({ url, subscription_id: sub.subscription_id });
      } else if (dbId && !sub) {
        await this.subscriptionRepo.delete({ subscription_id: dbId });
        await this.entryRepo.delete({ subscription_id: dbId });
        // await this.repo.save(await this.api.getSubscription(appSubId));
      }
    }
  }
}
