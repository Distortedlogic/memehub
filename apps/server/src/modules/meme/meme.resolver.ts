import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DataLoaders } from '../../../../core/decorators/dataLoaders';
import { EVotable } from '../../../../core/enums/EVotable';
import { VotableResolver } from '../../../../core/generics/resolvers/votable.resolver.g';
import { IUserPassport } from '../../../../core/interfaces/IUserPassport';
import { IDataLoaders } from '../../../internal/dataloader/dataloader.service';
import { BasicAuthGuard } from '../../../internal/guards/BasicAuthGuard';
import { ImageService } from '../../common/image/image.service';
import { ContestIdPaginatedArgs } from '../contest/contest.resolver.args';
import { UserPassport } from './../../../../core/decorators/userPassport';
import { EFlaggable } from './../../../../core/enums/EFlaggable';
import { MemeEntity } from './entities/meme.entity';
import { MemeIdArg, NewMemesArgs, PostMemeArgs, QueryMemesArgs } from './meme.resolver.args';
import { MemePDTO } from './meme.resolver.dto';
import { MemeService } from './meme.service';

dayjs.extend(utc);

@Resolver(() => MemeEntity)
export class MemeResolver extends VotableResolver(MemeEntity) {
  readonly eVotable = EVotable.MEME;
  readonly eFlaggable = EFlaggable.MEME;

  constructor(
    private readonly service: MemeService,
    private readonly imageService: ImageService,
  ) {
    super();
  }

  @ResolveField(() => String)
  url(@Parent() meme: MemeEntity, @DataLoaders() { image }: IDataLoaders) {
    return image.urlById.load(meme.imageId);
  }

  @ResolveField(() => Boolean)
  flagged(@DataLoaders() { flag }: IDataLoaders, @Parent() { id }: MemeEntity): Promise<boolean> {
    return flag[this.eFlaggable].hasFlagged.load(id);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @Query(() => MemeEntity)
  meme(@Args() { memeId }: MemeIdArg): Promise<MemeEntity> {
    return this.service.repo.findOneOrFail(memeId);
  }

  @Query(() => MemePDTO)
  memes(@Args() { take, skip, eTimeframe, eVotableOrder, userId }: QueryMemesArgs): Promise<MemePDTO> {
    return eVotableOrder
      ? this.service.repo.queryMemes({ take, skip, userId, eVotableOrder, eTimeframe })
      : this.service.repo.hotMemes({ eTimeframe, userId, take, skip });
  }

  @Query(() => MemePDTO)
  newMemes(@Args() { take, cursor, userId }: NewMemesArgs): Promise<MemePDTO> {
    return this.service.repo.newMemes({ take, cursor, userId });
  }

  @Query(() => MemePDTO)
  contestMemes(@Args() { contestId, skip, take }: ContestIdPaginatedArgs, @UserPassport() passport?: IUserPassport): Promise<MemePDTO> {
    return this.service.repo.contestMemes({ userId: passport?.userId, contestId, skip, take });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @Mutation(() => MemeEntity)
  @UseGuards(BasicAuthGuard)
  async postMeme(@UserPassport() { userId }: IUserPassport, @Args() { title, contestId }: PostMemeArgs) {
    const image = await this.imageService.createAndSaveImageFromToken({ userId });
    return this.service.repo.createAndSave({ title, userId, contestId, image });
  }
}
