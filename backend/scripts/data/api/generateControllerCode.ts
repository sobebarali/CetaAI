import fs from "fs";
import path from "path";

const generateControllerCode = (moduleName: string, operation: string) => {
  const controllerCode = `
    import { Request, Response } from "express";
    import runValidation from "../../../utils/runValidation";
    import ${operation}Schema from "../validators/${operation}.validator";
    import ${operation}${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} from "../handlers/${operation}.handler";

    export default async function endpoint${operation.charAt(0).toUpperCase() + operation.slice(1)}${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}(
      req: Request,
      res: Response
    ): Promise<any> {
      let validationResult = runValidation({
        payload: req.body,
        schema: ${operation}Schema,
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
        let result = await ${operation}${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}({ req, res });
        res.send(result);
      }
    }
  `;

  return controllerCode;
};

export default generateControllerCode;
