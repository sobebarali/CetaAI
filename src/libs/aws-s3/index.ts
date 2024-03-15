import { S3Client } from "@aws-sdk/client-s3";
import  config  from "../../configs";

const s3 = new S3Client({
  region: config.AWS_S3_PDF_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
});

export default s3;