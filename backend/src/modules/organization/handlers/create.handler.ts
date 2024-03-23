import { Response } from "express";
import { SessionRequest } from "supertokens-node/framework/express";
import config from "../../../configs";
import getObject from "../../../libs/aws-s3/Object/getObject";
import { loadPdfDocumentFromBlob } from "../../../services/loaders/document_loaders/pdf/pdf.loader";
import {
  typeResult,
  typeResultData,
  typeResultError,
} from "../types/organisation.types";

export default async function createOrganisation({
  req,
  res,
}: {
  req: SessionRequest;
  res: Response;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  // let userId = req.session!.getUserId();

 
  return { data, error };
}
