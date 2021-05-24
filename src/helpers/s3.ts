import AWS, { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { PassThrough } from 'stream';
import { MulterFile } from 'src/modules/media/media.interface';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY_ACCESS,
});

/**
 * S3 instance
 */
export const s3 = new AWS.S3({
  // region: process.env.AWS_S3_REGION,
  apiVersion: 'latest',
  /**
   * Timeout 1 minute
   */
  httpOptions: { timeout: 60 * 60 * 1000 },
});

export const createUploadStream = (
  data: Omit<S3.Types.PutObjectRequest, 'Bucket' | 'Body'>,
  options?: ManagedUpload.ManagedUploadOptions,
) => {
  const pass = new PassThrough();
  return {
    writeStream: pass,
    promise: s3
      .upload(
        {
          Bucket: process.env.AWS_S3_BUCKET_NAME ?? '',
          ACL: 'public-read',
          CacheControl: 'max-age=31536000', // 365 days
          ...data,
          Body: pass,
        },
        options,
      )
      .promise(),
  };
};

export const uploadMediaBase64 = (file: MulterFile, name: string) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: 'uploads/' + name,
    Body: file.buffer,
    ACL: 'public-read',
  };
  const s3upload = s3.upload(params).promise();

  return s3upload
    .then(function (data) {
      return data;
    })
    .catch(function (err) {
      console.log(err)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return err;
    });
};
