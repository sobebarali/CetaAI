import multer from "multer";
import multerS3 from "multer-s3";
import { config } from "../../configs";
import s3 from "../aws-s3";

const s3PdfUpload = multer({
  storage: multerS3({
    s3,
    bucket: config.AWS_S3_PDF_BUCKET,
    acl: "public-read",
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
