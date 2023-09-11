import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { S3ItemEntity } from '../../common/columns/s3-item';

interface IMemeImageS3sKeyProps extends Pick<MemeImageAbstract, 'eS3Folder' | 'userId' | 'hash' | 'ext'> {}

@ObjectType({ isAbstract: true })
abstract class MemeImageAbstract extends S3ItemEntity {
  @Field()
  @Column('uuid', { name: 'user_id' })
  userId: string;

  static getAwsKey({ eS3Folder, userId, hash, ext }: IMemeImageS3sKeyProps) {
    return `${eS3Folder}/${userId}/${hash}.${ext}`;
  }

  getAwsKey() {
    return MemeImageAbstract.getAwsKey(this);
  }

  static getAwsUrl({ eS3Bucket, ...args }: Pick<MemeImageAbstract, 'eS3Bucket'> & IMemeImageS3sKeyProps) {
    return `https://${eS3Bucket}.s3.amazonaws.com/${MemeImageAbstract.getAwsKey(args)}`;
  }

  getAwsUrl() {
    return MemeImageAbstract.getAwsUrl(this);
  }
}

@ObjectType()
@Entity('meme_images')
export class MemeImageEntity extends MemeImageAbstract {}

@ObjectType()
@Entity('meme_image_tokens')
export class MemeImageTokenEntity extends MemeImageAbstract {}
