import { Response } from "express";
import { SessionRequest } from "supertokens-node/framework/express";
import runValidation from "../../../../utils/runValidation";
import addPdf from "../../core/handlers/add.handler";
import addPdfSchema from "../validator/add.validator";

export default async function endpointAddPdf(
  req: SessionRequest,
  res: Response
): Promise<any> {
  let validationResult = runValidation({
    payload: req.body,
    schema: addPdfSchema,
  });

  if (typeof validationResult.error !== "undefined") {
    return res.status(400).json({
      data: null,
      error: {
        code: "VALIDATION_ERROR",
        message: validationResult.error,
      },
    });
  } else {
    let result = await addPdf({ req, res });
    res.send(result);
  }
}
