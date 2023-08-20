import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { ES3Bucket } from '../../../config/keys/aws.config';
import { NodeColumns } from '../../abstracts/node.columns';
import { EImageExtension } from '../../aws/misc/EImageExtension';
import { ES3Folder } from '../../aws/misc/ES3Folder';

interface IUserAvatarAwsKey extends Pick<UserAvatarAbstract, 'eS3Folder' | 'firmId' | 'userId' | 'hash' | 'ext'> {}

@ObjectType({ isAbstract: true })
export abstract class UserAvatarAbstract extends NodeColumns {
  @Column({ name: 'bucket', enum: ES3Bucket, type: 'enum' })
  eS3Bucket: ES3Bucket;

  @Column({ name: 'bucket_folder', enum: ES3Folder, type: 'enum', default: ES3Folder.Avatars })
  eS3Folder: ES3Folder = ES3Folder.Avatars;

  @Field()
  @Column()
  hash: string;

  @Field(() => EImageExtension)
  @Column({ enum: EImageExtension, type: 'enum' })
  ext: EImageExtension;

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @Field()
  @Column('uuid', { name: 'firm_id' })
  firmId: string;

  @Field()
  @Column('uuid', { name: 'user_id' })
  userId: string;

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  static getAwsKey({ eS3Folder, firmId, userId, hash, ext }: IUserAvatarAwsKey) {
    return `${eS3Folder}/${firmId}/${userId}/${hash}.${ext}`;
  }

  getAwsKey() {
    return UserAvatarAbstract.getAwsKey(this);
  }

  static getAwsUrl({ eS3Bucket, ...args }: Pick<UserAvatarAbstract, 'eS3Bucket'> & IUserAvatarAwsKey) {
    return `https://${eS3Bucket}.s3.amazonaws.com/${UserAvatarAbstract.getAwsKey(args)}`;
  }

  getAwsUrl() {
    return UserAvatarAbstract.getAwsUrl(this);
  }
}

@ObjectType()
@Entity('user_avatars')
export class UserAvatarEntity extends UserAvatarAbstract {}

@ObjectType()
@Entity('user_avatar_tokens')
export class UserAvatarTokenEntity extends UserAvatarAbstract {}
