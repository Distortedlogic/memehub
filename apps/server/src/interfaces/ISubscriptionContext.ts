import type { Context, WebSocket } from 'graphql-ws';
import type { IncomingMessage } from 'http';
import type { IDataLoaders } from '../modules/dataloader/dataloader.service';
import type { IUserPassport } from './IUserPassport';

export interface ISubscriptionContext extends Context<{ socket: WebSocket; request: IncomingMessage }, { user: IUserPassport }> {
  loaders: IDataLoaders;
}
