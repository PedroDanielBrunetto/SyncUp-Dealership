import { s3, bucketName, regionName } from "./config";

export class S3StorageProvider {
  async saveFile(
    key: string,
    buffer: Buffer,
    contentType: string
  ): Promise<string> {
    await s3
      .putObject({
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      })
      .promise();

    return `https://${bucketName}.s3.${regionName}.amazonaws.com/${key}`;
  }

  async deleteFile(key: string): Promise<void> {
    await s3
      .deleteObject({
        Bucket: bucketName,
        Key: key,
      })
      .promise();
  }
}
