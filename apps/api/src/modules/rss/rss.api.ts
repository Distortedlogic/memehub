import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { RssEntryEntity } from './entities/rss.entry.entity';

// docs
// https://docs.rssapi.net/

@Injectable()
export class RssApi {
  private readonly logger = new Logger(RssApi.name);
  constructor(private readonly httpService: HttpService) {}

  parseFeed(url: string) {
    return lastValueFrom(
      this.httpService
        .get<{
          ok: boolean;
          result: {
            settings: string[];
            info: {
              title: string;
              description: string;
              homepage: string;
              feed_url: string;
              additional_details: {
                language: string | null;
                categories: string[];
                authors: {
                  name: string;
                  url: string | null;
                  avatar: string | null;
                  email: string | null;
                }[];
                copyright: string | null;
              };
            };
            entries: RssEntryEntity[];
          };
        }>('/get', { params: { url } })
        .pipe(
          map((resp) => resp.data.result),
          catchError((e) => {
            this.logger.log(`url: ${url}`);
            this.logger.log('parseFeed error');
            this.logger.error(e);
            return of({ entries: [] as RssEntryEntity[] });
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  validateFeed(url: string) {
    return lastValueFrom(
      this.httpService
        .get<{
          ok: boolean;
          result: {
            valid_feed: boolean;
            feed_type: 'rss';
          };
        }>('/validate', { params: { url } })
        .pipe(
          map((resp) => resp.data.result),
          catchError((e) => {
            this.logger.log('validateFeed error');
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  detectFeeds(url: string) {
    return lastValueFrom(
      this.httpService
        .get<{
          ok: boolean;
          result: {
            title: string;
            feeds: string[];
            all_feeds: {
              type: string;
              title: string;
              url: string;
            }[];
          };
        }>('/validate', { params: { url } })
        .pipe(
          map((resp) => resp.data.result),
          catchError((e) => {
            this.logger.log('detectFeeds error');
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  combineFeeds(urls: string[]) {
    const params = urls.map((url) => ({ 'url[]': url }));
    return lastValueFrom(
      this.httpService
        .get<{
          ok: boolean;
          result: {
            settings: {
              combined: boolean;
            };
            info: {
              title: string;
              description: string;
              homepage: string;
              feed_url: string;
              additional_details: {
                language: string | null;
                categories: any[];
                authors: any[];
                copyright: string | null;
              };
            }[];
            entries: {
              title: string;
              link: string;
              description: string;
              guid: string;
              time: string;
              timestamp: number;
            }[];
          };
        }>('/combine', { params })
        .pipe(
          map((resp) => resp.data.result),
          catchError((e) => {
            this.logger.log('combineFeeds error');
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  createSubscription(params: { url: string; info?: string }) {
    return lastValueFrom(
      this.httpService
        .get<{
          ok: boolean;
          result: {
            status: string;
            subscription_id: string;
            feed_type: string;
            webhook_url: string;
            url: string;
            info: string;
          };
        }>('/subscribe', { params })
        .pipe(
          map((resp) => resp.data.result),
          catchError((e) => {
            this.logger.log('createSubscription error');
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  pauseSubscription(id: number) {
    return lastValueFrom(
      this.httpService
        .get<{
          ok: boolean;
          result: {
            status: string;
            subscription_id: string;
          };
        }>('/pausesubscription', { params: { id } })
        .pipe(
          map((resp) => resp.data.result),
          catchError((e) => {
            this.logger.log('pauseSubscription error');
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  resumeSubscription(id: number) {
    return lastValueFrom(
      this.httpService
        .get<{
          ok: boolean;
          result: {
            status: string;
            subscription_id: string;
          };
        }>('/resumesubscription', { params: { id } })
        .pipe(
          map((resp) => resp.data.result),
          catchError((e) => {
            this.logger.log('resumeSubscription error');
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getSubscriptions() {
    return lastValueFrom(
      this.httpService
        .get<{
          ok: boolean;
          result: {
            count: number;
            subscriptions: {
              subscription_id: string;
              info: string;
              type: string;
              feed_url: string;
              paused: boolean;
            }[];
          };
        }>('/getsubscriptions')
        .pipe(
          map((resp) => resp.data.result),
          catchError((e) => {
            this.logger.log('getSubscriptions error');
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  updateSubscription(params: { id: number; url: string }) {
    return lastValueFrom(
      this.httpService
        .get<{
          ok: boolean;
          result: {
            status: string;
            subscription_id: string;
            feed_type: string;
            webhook_url: string;
            url: string;
          };
        }>('/updatesubscriptionfeed', { params })
        .pipe(
          map((resp) => resp.data.result),
          catchError((e) => {
            this.logger.log('updateSubscription error');
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  removeSubscription(id: string) {
    return lastValueFrom(
      this.httpService
        .get<{
          ok: boolean;
          result: {
            status: string;
          };
        }>('/removesubscription', { params: { id } })
        .pipe(
          map((resp) => resp.data),
          catchError((e) => {
            this.logger.log('removeSubscription error');
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  resetSubscription(id: number) {
    return lastValueFrom(
      this.httpService
        .get<{
          ok: boolean;
          result: {
            status: string;
            subscription_id: string;
          };
        }>('/resetsubscription', { params: { id } })
        .pipe(
          map((resp) => resp.data.result),
          catchError((e) => {
            this.logger.log('resetSubscription error');
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }
}
