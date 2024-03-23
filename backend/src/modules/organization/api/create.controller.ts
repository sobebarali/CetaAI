import { Request, Response } from "express";
import { SessionRequest } from "supertokens-node/framework/express";
import runValidation from "../../../utils/runValidation";
import createSchema from "../validators/create.validator";
import createOrganisation from "../handlers/create.handler";

export default async function endpointCreateOrganisation(
  req: SessionRequest | Request,
  res: Response
): Promise<any> {
  let validationResult = runValidation({
    payload: req.body,
    schema: createSchema,
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
    let result = await createOrganisation({ req, res });
    res.send(result);
  }
}
