import fs from "fs";
import path from "path";

const generateHandlerCode = (moduleName: string, operation: string) => {
    const typesFilePath = path.join(
      __dirname,
      `../../../src/modules/${moduleName}/types/${operation}.types.ts`
    );
    const typesFileContent = fs.readFileSync(typesFilePath, "utf-8");

    const typePayloadName = `typePayload`;
    
    const typePayloadRegex = new RegExp(
      `export\\s+type\\s+${typePayloadName}\\s*=\\s*{\\s*([\\s\\S]*?)\\s*}\\s*;`
    );
    const typePayloadMatch = typesFileContent.match(typePayloadRegex);

    if (!typePayloadMatch) {
      throw new Error(`Type ${typePayloadName} not found in ${typesFilePath}`);
    }

    const typePayloadFields = typePayloadMatch[1]
      .split(";")
      .map((field) => field.trim());

    const destructuredPayload = typePayloadFields
      .map((field) => {
        const [key] = field.split(":").map((part) => part.trim());
        return key;
      })
      .join(", ");
  const handlerCode = `
    import { Request, Response } from "express";
    import { typePayload, typeResult, typeResultData, typeResultError } from "../types/${operation}.types";
    import ${moduleName}${operation.charAt(0).toUpperCase() + operation.slice(1)} from "../repository/${operation}.repository";

    export default async function ${operation}${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}(
      { req, res }: { req: Request; res: Response }
    ): Promise<typeResult> {
      let data: null | typeResultData = null;
      let error: null | typeResultError = null;

      try {
        let userId = req?.user?.user_id;
        const { ${destructuredPayload} } = req.body as ${typePayloadName};
        // Perform the ${operation} operation using the repository function
        // Example: data = await ${moduleName}${operation.charAt(0).toUpperCase() + operation.slice(1)}({ name, description }, userId);
      } catch (err: any) {
        error = {
          code: err.errorCode || "SOMETHING_WENT_WRONG",
          message: err.message || "Something went wrong",
        };
      }

      return { data, error };
    }
  `;

  return handlerCode;
};

export default generateHandlerCode;
