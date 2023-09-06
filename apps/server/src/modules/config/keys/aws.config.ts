import { registerAs } from '@nestjs/config';

export enum ES3Bucket {
  Local = 'lobbymatic-local',
}

const envToBucket = (env: string) => {
  switch (env) {
    case 'local':
      return ES3Bucket.Local;

    default:
      return ES3Bucket.Local;
  }
};

export interface IAWSEnvironment {
  bucket: ES3Bucket;
  s3: { region: string; credentials: { accessKeyId: string; secretAccessKey: string } };
}

export const awsEnvironment = registerAs(
  'awsEnvironment',
  (): IAWSEnvironment => ({
    bucket: envToBucket(process.env.AWS_S3_BUCKET),
    s3: {
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    },
  }),
);
