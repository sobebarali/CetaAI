import { Request, Response } from "express";
import runValidation from "../../../utils/runValidation";
import addPdf from "../../app/handlers/add";
import addPdfSchema from "../validator/add";

export default async function endpointAddPdf(
  req: Request,
  res: Response
): Promise<any> {
  let validationResult = runValidation({
    payload: req.body,
    schema: addPdfSchema,
  });

  if (typeof validationResult.error !== "undefined") {
    return res.status(400).json({ error: validationResult.error });
  } else {
    let result = await addPdf({ req, res });
    res.send(result);
  }
}
