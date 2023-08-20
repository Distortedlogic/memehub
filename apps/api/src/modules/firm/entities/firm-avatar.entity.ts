import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { ES3Bucket } from '../../../config/keys/aws.config';
import { NodeColumns } from '../../abstracts/node.columns';
import { EImageExtension } from '../../aws/misc/EImageExtension';
import { ES3Folder } from '../../aws/misc/ES3Folder';

interface IFirmAvatarAwsKey extends Pick<FirmAvatarAbstract, 'eS3Folder' | 'firmId' | 'hash' | 'ext'> {}

@ObjectType({ isAbstract: true })
export class FirmAvatarAbstract extends NodeColumns {
  @Column({ name: 'bucket', enum: ES3Bucket, type: 'enum' })
  eS3Bucket: ES3Bucket;

  @Column({ name: 'bucket_folder', enum: ES3Folder, type: 'enum', default: ES3Folder.Avatars })
  eS3Folder: ES3Folder = ES3Folder.Avatars;

  @Field()
  @Column('uuid', { name: 'firm_id' })
  firmId: string;

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

  static getAwsKey({ eS3Folder, firmId, hash, ext }: IFirmAvatarAwsKey) {
    return `${eS3Folder}/${firmId}/${hash}.${ext}`;
  }

  getAwsKey() {
    return FirmAvatarAbstract.getAwsKey(this);
  }

  static getAwsUrl({ eS3Bucket, ...args }: Pick<FirmAvatarAbstract, 'eS3Bucket'> & IFirmAvatarAwsKey) {
    return `https://${eS3Bucket}.s3.amazonaws.com/${FirmAvatarAbstract.getAwsKey(args)}`;
  }

  getAwsUrl() {
    return FirmAvatarAbstract.getAwsUrl(this);
  }
}

@ObjectType()
@Entity('firm_avatars')
export class FirmAvatarEntity extends FirmAvatarAbstract {}

@ObjectType()
@Entity('firm_avatar_tokens')
export class FirmAvatarTokenEntity extends FirmAvatarAbstract {}
