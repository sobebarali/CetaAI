import { Request, Response } from "express";
import runValidation from "../../../utils/runValidation";
import deleteSchema from "../validators/delete.validator";
import deleteOrganisation from "../handlers/delete.handler";


export default async function endpointDeleteOrganisation(
  req: Request,
  res: Response
): Promise<any> {
  let validationResult = runValidation({
    payload: req.body,
    schema: deleteSchema,
  });

  if (typeof validationResult.error !== "undefined") {
    return res.status(400).json({
      data: null,
      error: {
        code: "VALIDATION_ERROR",
        message: validationResult.error.details[0].message,
      },
    });
  } else {
    let result = await deleteOrganisation({ req, res });
    res.send(result);
  }
}
