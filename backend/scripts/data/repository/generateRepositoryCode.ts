import { randomBytes, randomInt, randomUUID } from "crypto";
import fs from "fs";
import path from "path";

const generateRepositoryCode = (moduleName: string, operation: string) => {
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

  const repositoryCode = `
    import { ${typePayloadName} } from "../types/${operation}.types";
    import { CustomError } from '../../../utils/customError';

    export default async function ${moduleName}${operation.charAt(0).toUpperCase() + operation.slice(1)}(
      { ${destructuredPayload} }: ${typePayloadName}
    ) {
      try {
        // Perform the ${operation} operation using the repository or database layer
        // Example: const result = await db.${moduleName}.${operation}({ ${destructuredPayload} });
        // Return the result data
        // Example: return { orgId: result.id, name: result.name };
      } catch (error) {
        console.error("${Math.floor(Math.random() * 100000000)} Error ${operation === "delete" ? "deleting" : operation + "ing"} ${moduleName}", error);
        throw new CustomError(
          "DB_ERROR",
          \`Error ${operation === "delete" ? "deleting" : operation + "ing"} ${moduleName}\`
        );
      }
    }
  `;

  return repositoryCode;
};

export default generateRepositoryCode;
