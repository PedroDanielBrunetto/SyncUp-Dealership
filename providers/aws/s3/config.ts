import { S3 } from "aws-sdk";

const s3 = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const regionName = process.env.AWS_REGION || "us-east-1";
const bucketName = process.env.AWS_BUCKET || "bucket";

export { s3, bucketName, regionName };
