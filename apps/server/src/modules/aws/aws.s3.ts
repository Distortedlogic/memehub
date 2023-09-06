import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  HeadObjectCommand,
  HeadObjectCommandInput,
  ListObjectsCommand,
  ListObjectsCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ES3Bucket, awsEnvironment } from '../config/keys/aws.config';

@Injectable()
export class AwsS3 {
  private s3: S3Client;
  public eS3Bucket: ES3Bucket;

  constructor(
    @Inject(awsEnvironment.KEY)
    private readonly awsEnv: ConfigType<typeof awsEnvironment>,
  ) {
    this.s3 = new S3Client(this.awsEnv.s3);
    this.eS3Bucket = this.awsEnv.bucket;
  }

  deleteObject(data: Omit<DeleteObjectCommandInput, 'Bucket'>) {
    try {
      const command = new DeleteObjectCommand({ Bucket: this.awsEnv.bucket, ...data });
      return this.s3.send(command);
    } catch (error) {
      // TODO better Exception handling for AWS
      throw new NotFoundException();
    }
  }

  async checkFileExists(data: Omit<HeadObjectCommandInput, 'Bucket'>) {
    try {
      const command = new HeadObjectCommand({ Bucket: this.awsEnv.bucket, ...data });
      await this.s3.send(command);
      return true;
    } catch (error) {
      return false;
    }
  }

  getSignedUrl(input: Omit<PutObjectCommandInput, 'Bucket'>) {
    const command = new PutObjectCommand({ Bucket: this.awsEnv.bucket, ...input });
    return getSignedUrl(this.s3, command, { expiresIn: 10 });
  }

  listObjects(input: Omit<ListObjectsCommandInput, 'Bucket'>) {
    const command = new ListObjectsCommand({ Bucket: this.awsEnv.bucket, ...input });
    return this.s3.send(command);
  }
}
