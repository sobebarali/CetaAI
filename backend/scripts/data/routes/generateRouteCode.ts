import fs from "fs";
import path from "path";

const generateRouteCode = (moduleName: string, operations: string[]) => {
  const routeCode = `
    import express from "express";
    
    ${operations
      .map(
        (operation) =>
          `import endpoint${operation.charAt(0).toUpperCase() + operation.slice(1)}${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} from "../api/${operation}.controller";`
      )
      .join("\n")}

    const ${moduleName}Router = express.Router();

    ${operations
      .map((operation) => {
        if (operation === "list") {
          return `${moduleName}Router.get(
      "/${moduleName}s",
      endpoint${operation.charAt(0).toUpperCase() + operation.slice(1)}${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}
    );`;
        } else if (operation === "update") {
          return `${moduleName}Router.put(
      "/${moduleName}",
      endpoint${operation.charAt(0).toUpperCase() + operation.slice(1)}${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}
    );`;
        } else {
          return `${moduleName}Router.${operation === "get" ? "get" : operation === "delete" ? "delete" : "post"}(
      "/${moduleName}",
      endpoint${operation.charAt(0).toUpperCase() + operation.slice(1)}${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}
    );`;
        }
      })
      .join("\n")}

    export default ${moduleName}Router;
  `;

  return routeCode;
};

export default generateRouteCode;
