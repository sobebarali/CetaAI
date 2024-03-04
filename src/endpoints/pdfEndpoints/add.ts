import { Request, Response } from "express";
import runValidation from "../../utils/runValidation";
import addPdf from "../../controllers/pdfControllers/addPdf";
import addPdfschema from "../../validators/pdfValidators/add";


export type typePayload = {};

export type typeResultData = {
  isAdded: boolean;
  pdfId: string;
};

export type typeResultError = {
  code: string;
  message: string;
  details?: Object;
};

export type typeResult = {
  data: null | typeResultData;
  error: null | typeResultError;
  meta?: null | Object;
};

export default async function endpointAddPdf(
  req: Request,
  res: Response
): Promise<any> {
  let validationResult = runValidation({
    payload: req.body,
    schema: addPdfschema,
  });

  if (typeof validationResult.error !== "undefined") {
    return res.status(400).json({ error: validationResult.error });
  } else {
    let result = await addPdf({ req, res });
    res.send(result);
  }
}
