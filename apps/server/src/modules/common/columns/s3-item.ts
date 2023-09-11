import { Field, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';
import { ES3Folder } from '../../aws/misc/ES3Folder';
import { ES3Bucket } from '../../config/keys/aws.config';
import { NodeColumns } from './node';

@ObjectType({ isAbstract: true })
export abstract class S3ItemEntity extends NodeColumns {
  @Field()
  @Column({ enum: ES3Bucket, name: 'bucket' })
  eS3Bucket: ES3Bucket;

  @Field(() => ES3Folder)
  @Column({ enum: ES3Folder, name: 'folder' })
  eS3Folder: ES3Folder;

  @Field()
  @Column()
  hash: string;

  @Field()
  @Column()
  ext: string;
}
