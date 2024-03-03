import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { config } from "../../configs";

const s3 = new S3Client({
    region: config.AWS_S3_PDF_REGION,
    credentials: {
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    },
});

const s3PdfUpload = multer({
  storage: multerS3({
    s3,
    bucket: config.AWS_S3_PDF_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, {
        fieldName: file.fieldname,
        mimetype: file.mimetype,
      });
    },
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

export default s3PdfUpload;
