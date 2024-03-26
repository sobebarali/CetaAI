import { Request, Response } from "express";
import runValidation from "../../../utils/runValidation";
import updateSchema from "../validators/update.validator";
import updateOrganisation from "../handlers/update.handler";

export default async function endpointUpdateOrganisation(
  req: Request,
  res: Response
): Promise<any> {
  let fields = ["name", "description"];

  fields.forEach((field) => {
    if (
      req.body[field] === undefined ||
      req.body[field] === null ||
      req.body[field] === ""
    ) {
      delete req.body[field];
    }
  });
  let validationResult = runValidation({
    payload: req.body,
    schema: updateSchema,
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
    let result = await updateOrganisation({ req, res });
    res.send(result);
  }
}
