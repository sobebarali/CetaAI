import { Request,Response } from "express";
import {
  typeResult,
  typeResultData,
  typeResultError,
} from "../types/pdf.types";

export default async function addPdf({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  const files = req.files as Express.MulterS3.File[];

  if (!files) {
    error = {
      code: "FILE_REQUIRED",
      message: "File is required",
    };
  }



  return { data, error };
}
