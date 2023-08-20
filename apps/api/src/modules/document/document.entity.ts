import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { ES3Bucket } from '../../config/keys/aws.config';
import { NodeColumns } from '../abstracts/node.columns';
import { EExtension } from '../aws/misc/EExtension';
import { ES3Folder } from '../aws/misc/ES3Folder';

interface IDocumentAwsKeyProps
  extends Pick<DocumentAbstract, 'eS3Folder' | 'firmId' | 'workspaceId' | 'clientId' | 'userId' | 'hash' | 'ext'> {}

@ObjectType({ isAbstract: true })
export abstract class DocumentAbstract extends NodeColumns {
  @Field()
  @Column({ name: 'display_name' })
  displayName: string;

  @Column({ name: 'bucket', enum: ES3Bucket, type: 'enum' })
  eS3Bucket: ES3Bucket;

  @Column({ name: 'bucket_folder', enum: ES3Folder, type: 'enum', default: ES3Folder.Documents })
  eS3Folder: ES3Folder = ES3Folder.Documents;

  @Field()
  @Column()
  hash: string;

  @Field(() => EExtension)
  @Column({ enum: EExtension, type: 'enum' })
  ext: EExtension;

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @Field()
  @Column('uuid', { name: 'firm_id' })
  firmId: string;

  @Field()
  @Column('uuid', { name: 'workspace_id' })
  workspaceId: string;

  @Field()
  @Column('uuid', { name: 'client_id' })
  clientId: string;

  @Field()
  @Column('uuid', { name: 'user_id' })
  userId: string;

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  static getAwsKey({ eS3Folder, firmId, workspaceId, clientId, userId, hash, ext }: IDocumentAwsKeyProps) {
    return `${eS3Folder}/${firmId}/${workspaceId}/${clientId}/${userId}/${hash}.${ext}`;
  }

  getAwsKey() {
    return DocumentAbstract.getAwsKey(this);
  }

  static getAwsUrl({ eS3Bucket, ...args }: Pick<DocumentAbstract, 'eS3Bucket'> & IDocumentAwsKeyProps) {
    return `https://${eS3Bucket}.s3.amazonaws.com/${DocumentAbstract.getAwsKey(args)}`;
  }

  getAwsUrl() {
    return DocumentAbstract.getAwsUrl(this);
  }
}

@ObjectType()
@Entity('documents')
export class DocumentEntity extends DocumentAbstract {}

@ObjectType()
@Entity('document_tokens')
export class DocumentTokenEntity extends DocumentAbstract {}
