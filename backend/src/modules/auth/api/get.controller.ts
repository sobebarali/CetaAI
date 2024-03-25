import { Request, Response } from "express";
import runValidation from "../../../utils/runValidation";
import getSchema from "../validators/get.validator";
import getUser from "../handlers/get.handler";

export default async function endpointGetUser(
  req: Request,
  res: Response
): Promise<any> {
  let validationResult = runValidation({
    payload: req.body,
    schema: getSchema,
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
    let result = await getUser({ req, res });
    res.send(result);
  }
}
