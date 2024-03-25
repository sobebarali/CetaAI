import { Request, Response } from "express";
import config from "../../../configs";
import getObject from "../../../libs/aws-s3/Object/getObject";
import { loadPdfDocumentFromBlob } from "../../../services/loaders/document_loaders/pdf/pdf.loader";
import {
  typeResult,
  typeResultData,
  typeResultError,
} from "../types/pdf.types";

export default async function getPdf({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  // let userId = req.session!.getUserId();

  const files = req.files as Express.MulterS3.File[];

  if (!files) {
    error = {
      code: "FILE_REQUIRED",
      message: "File is required",
    };
  }

  let filesData: [
    {
      Body: any;
    }
  ] = [
    {
      Body: "",
    },
  ];

  if (error === null) {
    try {
      await Promise.all(
        files.map(async (file) => {
          const { originalname } = file;

          const s3GetResponse = await getObject({
            bucket: config.AWS_S3_PDF_BUCKET,
            key: originalname,
          });

          const data = await s3GetResponse.Body?.transformToByteArray();

          filesData.push({
            Body: data || "",
          });
        })
      );
    } catch (err) {
      error = {
        code: "GET_OBJECT_ERROR",
        message: "Error getting object",
      };
    }
  }

  if (error === null) {
    filesData.map(async (file) => {
      let blob = new Blob([file.Body], { type: "application/pdf" });
      const load = await loadPdfDocumentFromBlob({
        blob,
      });
    });
  }

  return { data, error };
}
