import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DataLoaders } from '../../decorators/dataLoaders';
import { UserPassport } from '../../decorators/userPassport';
import { PaginatedArgsWithSearch } from '../../generics/pagination.g';
import { BasicAuthGuard } from '../../guards/BasicAuthGuard';
import { IUserPassport } from '../../interfaces/IUserPassport';
import { AwsS3 } from '../aws/aws.s3';
import { extToContentType } from '../aws/misc/extToContentType';
import { IDataLoaders } from '../dataloader/dataloader.service';
import { FirmArgs } from './args/FirmArgs';
import { FirmIdArg } from './args/FirmIdArg';
import { FirmUpdateArgs } from './args/FirmUpdateArgs';
import { GetFirmAvatarSignedUrlArgs } from './args/GetFirmAvatarSignedUrlArgs';
import { FirmAvatarEntity, FirmAvatarTokenEntity } from './entities/firm-avatar.entity';
import { FirmEntity } from './entities/firm.entity';

@Resolver(FirmEntity)
@UseGuards(BasicAuthGuard)
export class FirmResolver {
  constructor(
    @InjectRepository(FirmEntity)
    private readonly firmRepo: Repository<FirmEntity>,
    @InjectRepository(FirmAvatarEntity)
    private readonly firmAvatarRepo: Repository<FirmAvatarEntity>,
    @InjectRepository(FirmAvatarTokenEntity)
    private readonly firmAvatarTokenRepo: Repository<FirmAvatarTokenEntity>,
    private readonly s3: AwsS3,
  ) {}

  @ResolveField(() => String, { nullable: true })
  avatar(@Parent() { avatarId }: FirmEntity, @DataLoaders() { firmAvatar }: IDataLoaders) {
    if (!avatarId) return null;
    return firmAvatar.urlById.load(avatarId);
  }

  @Query(() => [FirmEntity])
  async getFirms(@Args() { take, skip, search }: PaginatedArgsWithSearch): Promise<FirmEntity[]> {
    return this.firmRepo.find({ take, skip, where: { name: search ? ILike(`%${search}%`) : undefined } });
  }

  @Query(() => FirmEntity)
  getFirm(@Args() { firmId }: FirmIdArg) {
    return this.firmRepo.findOneByOrFail({ id: firmId });
  }

  @Mutation(() => FirmEntity)
  async createFirm(@Args() { name }: FirmArgs): Promise<FirmEntity> {
    const firm = await this.firmRepo.save({ name });
    return firm;
  }

  @Mutation(() => String)
  async deleteFirm(@Args() { firmId }: FirmIdArg): Promise<string> {
    await this.firmRepo.delete(firmId);
    return firmId;
  }

  @Mutation(() => FirmEntity)
  async updateFirm(@Args() args: FirmUpdateArgs): Promise<FirmEntity> {
    await this.firmRepo.save(args);
    const firm = await this.firmRepo.findOneByOrFail({ id: args.id });
    return firm;
  }

  @Mutation(() => String)
  async getFirmAvatarSignedUrl(@UserPassport() { firmId }: IUserPassport, @Args() { hash, ext }: GetFirmAvatarSignedUrlArgs) {
    const token = await this.firmAvatarTokenRepo.save({ firmId, hash, ext });
    return this.s3.getSignedUrl({ Key: token.getAwsKey(), ContentType: extToContentType[ext] });
  }

  @Mutation(() => String)
  async setFirmAvatar(@UserPassport() { firmId }: IUserPassport) {
    const token = await this.firmAvatarTokenRepo.findOneByOrFail({ firmId });
    if (!(await this.s3.checkFileExists({ Key: token.getAwsKey() }))) {
      throw new Error('file doesnt exists on AWS');
    }
    const avatar = await this.firmAvatarRepo.findOneBy({ firmId: token.firmId });
    if (avatar) {
      await this.s3.deleteObject({ Key: avatar.getAwsKey() });
    }
    await this.firmAvatarRepo.save(token);
    await this.firmAvatarTokenRepo.delete({ firmId });
    return FirmAvatarEntity.getAwsUrl(token);
  }
}
