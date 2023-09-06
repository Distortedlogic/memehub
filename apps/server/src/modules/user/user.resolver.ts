import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DataLoaders } from '../../decorators/dataLoaders';
import { UserPassport } from '../../decorators/userPassport';
import { IUserPassport } from '../../interfaces/IUserPassport';
import { GetSignedUrlArgs } from '../aws/args/GetSignedUrlsArgs';
import { AwsS3 } from '../aws/aws.s3';
import { extToContentType } from '../aws/misc/extToContentType';
import { PaginatedArgsWithSearch } from '../common/args/pagination';
import { IDataLoaders } from '../dataloader/dataloader.service';
import { BasicAuthGuard } from './../../guards/BasicAuthGuard';
import { UserArgs } from './args/UserArgs';
import { UserIdArg } from './args/UserIdArg';
import { UserUpdateArgs } from './args/UserUpdateArgs';
import { UserAvatarEntity, UserAvatarTokenEntity } from './entities/user-avatar.entity';
import { UserEntity } from './entities/user.entity';

@Resolver(() => UserEntity)
@UseGuards(BasicAuthGuard)
export class UserResolver {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(UserAvatarEntity)
    private readonly userAvatarRepo: Repository<UserAvatarEntity>,
    @InjectRepository(UserAvatarTokenEntity)
    private readonly userAvatarTokenRepo: Repository<UserAvatarTokenEntity>,
    private readonly s3: AwsS3,
  ) {}

  @ResolveField(() => String, { nullable: true })
  avatar(@Parent() { avatarId }: UserEntity, @DataLoaders() { userAvatar }: IDataLoaders) {
    if (!avatarId) return null;
    return userAvatar.urlById.load(avatarId);
  }

  @Query(() => [UserEntity])
  getUsers(@Args() { take, skip, search }: PaginatedArgsWithSearch): Promise<UserEntity[]> {
    return this.userRepo.find({ take, skip, where: { email: search ? ILike(`%${search}%`) : undefined } });
  }

  @Query(() => UserEntity)
  getUser(@Args() { userId }: UserIdArg): Promise<UserEntity> {
    return this.userRepo.findOneByOrFail({ id: userId });
  }

  @Mutation(() => UserEntity)
  async createUser(@Args() args: UserArgs): Promise<UserEntity> {
    const user = await this.userRepo.save(args);
    return user;
  }

  @Mutation(() => String)
  async deleteUser(@Args() { userId }: UserIdArg): Promise<string> {
    await this.userRepo.delete(userId);
    const avatar = await this.userAvatarRepo.findOneBy({ userId });
    if (avatar) {
      await this.s3.deleteObject({ Key: avatar.getAwsKey() });
      await this.userAvatarRepo.delete(avatar.id);
    }
    return userId;
  }

  @Mutation(() => UserEntity)
  async updateUser(@Args() args: UserUpdateArgs): Promise<UserEntity> {
    await this.userRepo.save(args);
    const user = await this.userRepo.findOneByOrFail({ id: args.id });
    return user;
  }

  @Mutation(() => String)
  async getUserAvatarSignedUrl(@UserPassport() { userId }: IUserPassport, @Args() { hash, ext }: GetSignedUrlArgs) {
    const token = await this.userAvatarTokenRepo.save(this.userAvatarTokenRepo.create({ eS3Bucket: this.s3.eS3Bucket, userId, hash, ext }));
    return this.s3.getSignedUrl({ Key: token.getAwsKey(), ContentType: extToContentType[ext] });
  }

  @Mutation(() => UserEntity)
  async setUserAvatar(@UserPassport() { userId }: IUserPassport) {
    const token = await this.userAvatarTokenRepo.findOneByOrFail({ userId });
    if (!(await this.s3.checkFileExists({ Key: token.getAwsKey() }))) {
      throw new Error('file doesnt exists on AWS');
    }
    const oldAvatar = await this.userAvatarRepo.findOneBy({ userId: token.userId });
    if (oldAvatar) {
      await this.s3.deleteObject({ Key: oldAvatar.getAwsKey() });
    }
    const newAvatar = await this.userAvatarRepo.save(token);
    await this.userAvatarTokenRepo.delete(token.id);
    const user = await this.userRepo.findOneByOrFail({ id: userId });
    user.avatarId = newAvatar.id;
    return this.userRepo.save(user);
  }
}
