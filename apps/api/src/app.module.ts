import { ApolloServerPlugin } from '@apollo/server';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Enhancer, GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import createNewRelicPlugin from '@newrelic/apollo-server-plugin';
import { OgmaInterceptor, OgmaModule } from '@ogma/nestjs-module';
import { ExpressParser } from '@ogma/platform-express';
import { GraphQLParser } from '@ogma/platform-graphql';
import { RedisParser } from '@ogma/platform-redis';
import { WsParser } from '@ogma/platform-ws';
import { RedisModule, RedisService } from '@songkeys/nestjs-redis';
import * as store from 'cache-manager-ioredis';
import RedisStore from 'connect-redis';
import cookie from 'cookie';
import { signedCookies } from 'cookie-parser';
import expressSession from 'express-session';
import { Context } from 'graphql-ws';
import type { RedisOptions } from 'ioredis';
import passport from 'passport';
import { join } from 'path';
import { IEnvironments } from './config/environment.interface';
import { databaseEnvironment } from './config/services/database.config';
import { redisEnvironment } from './config/services/redis.config';
import { serverEnvironment } from './config/services/server.config';
import { AuthModule } from './modules/auth/auth.module';
import { AwsModule } from './modules/aws/aws.module';
import { CalendarModule } from './modules/calendar/calendar.module';
import { Click2mailModule } from './modules/click2mail/click2mail.module';
import { ClientModule } from './modules/client/client.module';
import { CompletionModule } from './modules/completion/completion.module';
import { CongressGovModule } from './modules/congress-gov/congress-gov.module';
import { DataloaderModule } from './modules/dataloader/dataloader.module';
import { DataloaderService } from './modules/dataloader/dataloader.service';
import { DocumentModule } from './modules/document/document.module';
import { EncryptionModule } from './modules/encryption/encryption.module';
import { FakerModule } from './modules/faker/faker.module';
import { FirmModule } from './modules/firm/firm.module';
import { NoteModule } from './modules/note/note.module';
import { AiModule } from './modules/openai/openai.module';
import { PromptModule } from './modules/prompt/prompt.module';
import { ResendModule } from './modules/resend/resend.module';
import { RssModule } from './modules/rss/rss.module';
import { StatsModule } from './modules/stats/stats.module';
import { TaskModule } from './modules/task/task.module';
import { TimezoneModule } from './modules/timezone/timezone.module';
import { UserModule } from './modules/user/user.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { DatabaseLogger } from './typeormLogger';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ load: [serverEnvironment] }),
    CacheModule.registerAsync<RedisOptions>({
      isGlobal: true,
      imports: [ConfigModule.forRoot({ load: [redisEnvironment] })],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IEnvironments, true>) => ({
        ttl: 60,
        store,
        ...configService.get('redisEnvironment', { infer: true }),
      }),
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule.forRoot({ load: [redisEnvironment] })],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IEnvironments>) => ({
        isGlobal: true,
        config: configService.get('redisEnvironment', { infer: true }),
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule.forRoot({ load: [redisEnvironment] })],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IEnvironments, true>) => ({
        redis: configService.get('redisEnvironment', { infer: true }),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ load: [serverEnvironment, databaseEnvironment] })],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IEnvironments, true>): TypeOrmModuleOptions => ({
        ...configService.get('databaseEnvironment', { infer: true }),
        autoLoadEntities: true,
        synchronize:
          configService.get('serverEnvironment.isLocal', { infer: true }) || configService.get('serverEnvironment.isDev', { infer: true }),
        keepConnectionAlive: !configService.get('serverEnvironment.isProd', { infer: true }),
        logger: new DatabaseLogger(),
        cache: { type: 'ioredis', options: configService.get('redisEnvironment', { infer: true }) },
      }),
    }),
    ResendModule,
    TimezoneModule,
    EncryptionModule,
    AwsModule,
    CongressGovModule,
    Click2mailModule,
    CalendarModule,
    AiModule,
    UserModule,
    WorkspaceModule,
    ClientModule,
    FirmModule,
    DocumentModule,
    RssModule,
    PromptModule,
    CompletionModule,
    StatsModule,
    AuthModule,
    FakerModule,
    DataloaderModule,
    NoteModule,
    TaskModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataloaderModule, ConfigModule.forRoot({ load: [serverEnvironment] })],
      inject: [ConfigService, DataloaderService, RedisService],
      useFactory: (
        configService: ConfigService<IEnvironments, true>,
        dataloaderService: DataloaderService,
        redisService: RedisService,
      ) => ({
        playground: false,
        cors: configService.get('serverEnvironment.corsOptions', { infer: true }),
        subscriptions: {
          'graphql-ws': {
            onConnect: async (context: Context<Record<string, unknown> | undefined, any>) => {
              // instead of using passportjs for ws subscription auth
              // we directly parse cookies and get session data from redis
              // finally we add session data to `extra` property of the context
              // to expose the session data throughout the ws lifecycle
              // particularly, this enables auth guards to function properly and subscription filtering
              const headerCookie = context.extra.request.headers.cookie;
              if (headerCookie) {
                const { speedCowOwen } = signedCookies(
                  cookie.parse(headerCookie),
                  configService.get('serverEnvironment.secret', { infer: true }),
                );
                if (speedCowOwen) {
                  const session = await redisService.getClient().get(`sess:${speedCowOwen}`);
                  if (session) {
                    context.extra.user = JSON.parse(session).passport.user;
                    return true;
                  }
                }
              }
              return false;
            },
            onDisconnect: () => console.log('WS DISCONNECTED'),
            onSubscribe: () => console.log('WS SUBSCRIBED'),
            onClose: () => console.log('WS CLOSED'),
            path: '/graphql',
          },
        },
        context: (ctx: any) => ({ ...ctx, loaders: dataloaderService.dataloaders(ctx.req?.user) }),
        autoSchemaFile: join(process.cwd(), 'schema.gql'),
        sortSchema: true,
        // cache: new KeyvAdapter(new Keyv({ store: new KeyvRedis("redis://localhost:6379") })),
        // plugins: [
        //   responseCachePlugin({
        //     sessionId: async (requestContext: GraphQLRequestContext<IGraphQLContext>) => requestContext.context.req?.user?.username,
        //   }),
        // ],
        fieldResolverEnhancers: ['filters', 'guards'] as Enhancer[],
        // resolvers: { JSON: GraphQLJSON },
        plugins: [createNewRelicPlugin<ApolloServerPlugin>({})],
      }),
    }),
    OgmaModule.forRoot({ color: true, json: false, application: 'LM' }),
  ],
  providers: [ExpressParser, GraphQLParser, RedisParser, WsParser, Logger, { provide: APP_INTERCEPTOR, useClass: OgmaInterceptor }],
})
export class AppModule implements NestModule {
  constructor(
    private readonly configService: ConfigService<IEnvironments, true>,
    private readonly redisService: RedisService,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AppLoggerMiddleware).forRoutes("*");
    const secret = this.configService.get('serverEnvironment.sessionOptions.secret', { infer: true });
    consumer
      .apply(
        expressSession({
          store: new RedisStore({ client: this.redisService.getClient(), disableTouch: true, disableTTL: true }),
          secret,
          ...this.configService.get('serverEnvironment.sessionOptions', { infer: true }),
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
