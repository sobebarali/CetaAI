import { Response, Request } from "express";
import { typePayload, typeResult, typeResultData, typeResultError } from "../../endpoints/pdfEndpoints/add";

export default async function addPdf({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  const file: typePayload["file"] = req.files

  console.log(file);

  return { data, error };
}
