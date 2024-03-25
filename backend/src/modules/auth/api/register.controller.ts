import { Request, Response } from "express";
import runValidation from "../../../utils/runValidation";
import registerSchema from "../validators/register.validator";
import registerWithEmailAndPassword from "../handlers/register.handler";

export default async function endpointRegisterUser(
  req: Request,
  res: Response
): Promise<any> {
  let validationResult = runValidation({
    payload: req.body,
    schema: registerSchema,
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
    let result = await registerWithEmailAndPassword({ req, res });
    res.send(result);
  }
}
