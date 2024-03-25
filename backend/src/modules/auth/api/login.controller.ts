import { Request, Response } from "express";
import runValidation from "../../../utils/runValidation";
import loginSchema from "../validators/login.validator";
import loginWithEmailAndPassword from "../handlers/login.handler";


export default async function endpointLoginUser(
  req: Request,
  res: Response
): Promise<any> {
  let validationResult = runValidation({
    payload: req.body,
    schema: loginSchema,
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
    let result = await loginWithEmailAndPassword({ req, res });
    res.send(result);
  }
}
