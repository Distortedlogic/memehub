import type { Request, Response } from 'express';
import type { IDataLoaders } from '../modules/dataloader/dataloader.service';
import type { IExpressSession } from './IExpressSession';
import type { IUserPassport } from './IUserPassport';

export interface IGraphQLContext {
  req: Request & { session: IExpressSession; user: IUserPassport };
  res: Response;
  loaders: IDataLoaders;
}
