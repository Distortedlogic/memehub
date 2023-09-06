import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { ES3Folder } from '../../aws/misc/ES3Folder';
import { NodeColumns } from '../../common/columns/node';
import { ES3Bucket } from '../../config/keys/aws.config';

@ObjectType({ isAbstract: true })
@Entity('meme_images')
export class ImageEntity extends NodeColumns {
  @Field({ nullable: true })
  @Column({ enum: ES3Bucket, nullable: true })
  eS3Bucket?: ES3Bucket;

  @Field(() => ES3Folder)
  @Column({ name: 'bucket_folder', enum: ES3Folder, nullable: true })
  eBucketFolder?: ES3Folder;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hash?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  ext?: string;
}
