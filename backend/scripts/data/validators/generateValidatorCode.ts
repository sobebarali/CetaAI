import fs from "fs";
import path from "path";

const generateValidatorCode = (moduleName: string, operation: string) => {
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

  const joiValidationRules = typePayloadFields
    .map((field) => {
      const [key, type] = field.split(":").map((part) => part.trim());
      if (!key || !type) {
        return null;
      }
      return `${key}: Joi.${type
        .replace("string", "string")
        .replace("number", "number")
        .replace("boolean", "boolean")}().required(),`;
    })
    .filter((rule) => rule !== null);

  const validatorCode = `
    import Joi from 'joi';
    import { typePayload } from '../types/${operation}.types';

    const ${operation}Schema = Joi.object<${typePayloadName}>({
      ${joiValidationRules.join("\n")}
    });

    export default ${operation}Schema;
  `;

  return validatorCode;
};

export default generateValidatorCode;
