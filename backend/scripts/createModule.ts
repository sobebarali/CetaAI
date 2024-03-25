import fs from "fs";
import path from "path";
import readline from "readline";
import generateTypesCode from "./data/types/generateTypesCode";
import generateValidatorCode from "./data/validators/generateValidatorCode";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getModuleName = () => {
  return new Promise<string>((resolve) => {
    rl.question("Enter the module name: ", (answer) => {
      resolve(answer);
    });
  });
};

const confirmTypes = () => {
  return new Promise<void>((resolve) => {
    rl.question("Have you defined the types? (yes/no): ", (answer) => {
      if (answer.toLowerCase() === "yes") {
        resolve();
      } else {
        console.log("Please define the types and run the script again.");
        process.exit(1);
      }
    });
  });
};


const confirmValidators = () => {
  return new Promise<void>((resolve) => {
    rl.question(
      "Have you defined the validation schemas? (yes/no): ",
      (answer) => {
        if (answer.toLowerCase() === "yes") {
          resolve();
        } else {
          console.log(
            "Please define the validation schemas and run the script again."
          );
          process.exit(1);
        }
      }
    );
  });
};

const createModule = async () => {
  let moduleName = process.argv[2];

  if (!moduleName) {
    moduleName = await getModuleName();
  }

  const modulePath = path.join("src/modules", moduleName);
  const crudOperations = ["create", "get", "update", "delete", "list"];

  // Create the module directory if it doesn't exist
  if (!fs.existsSync(modulePath)) {
    fs.mkdirSync(modulePath);
  }

  // Create the types directory if it doesn't exist
  const typesPath = path.join(modulePath, "types");
  if (!fs.existsSync(typesPath)) {
    fs.mkdirSync(typesPath);
  }

  // Create moduleName.types.ts file if it doesn't exist
  const typesFilePath = path.join(typesPath, `${moduleName}.types.ts`);
  crudOperations.forEach((operation) => {
    const filePath = path.join(typesPath, `${operation}.types.ts`);
    if (!fs.existsSync(filePath)) {
      const typesCode = generateTypesCode();
      fs.writeFileSync(filePath, typesCode);
      console.log(`Please define the types in ${filePath} and confirm.`);
    }
  });

  // Create the validators directory if it doesn't exist
  const validatorsPath = path.join(modulePath, "validators");
  if (!fs.existsSync(validatorsPath)) {
    fs.mkdirSync(validatorsPath);
  }

  

  // Create missing CRUD files in the validators directory
  crudOperations.forEach((operation) => {
    const filePath = path.join(validatorsPath, `${operation}.validator.ts`);
    if (!fs.existsSync(filePath)) {
      const validatorCode = generateValidatorCode(moduleName, operation);
      fs.writeFileSync(filePath, validatorCode);
      console.log(
        `Please define the validation schema in ${filePath} and confirm.`
      );
    }
  });

  await confirmValidators();

  // Create the api directory if it doesn't exist
  const apiPath = path.join(modulePath, "api");
  if (!fs.existsSync(apiPath)) {
    fs.mkdirSync(apiPath);
  }

  // Create missing CRUD files in the api directory
  crudOperations.forEach((operation) => {
    const filePath = path.join(apiPath, `${operation}.controller.ts`);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "");
    }
  });

  // Create the handlers directory if it doesn't exist
  const handlersPath = path.join(modulePath, "handlers");
  if (!fs.existsSync(handlersPath)) {
    fs.mkdirSync(handlersPath);
  }

  // Create missing CRUD files in the handlers directory
  crudOperations.forEach((operation) => {
    const filePath = path.join(handlersPath, `${operation}.handler.ts`);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "");
    }
  });

  // Create the repository directory if it doesn't exist
  const repositoryPath = path.join(modulePath, "repository");
  if (!fs.existsSync(repositoryPath)) {
    fs.mkdirSync(repositoryPath);
  }

  // Create missing CRUD files in the repository directory
  crudOperations.forEach((operation) => {
    const filePath = path.join(repositoryPath, `${operation}.repository.ts`);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "");
    }
  });

  // Create the routes directory if it doesn't exist
  const routesPath = path.join(modulePath, "routes");
  if (!fs.existsSync(routesPath)) {
    fs.mkdirSync(routesPath);
  }

  // Create moduleName.routes.ts file if it doesn't exist
  const routesFilePath = path.join(routesPath, `${moduleName}.routes.ts`);
  if (!fs.existsSync(routesFilePath)) {
    fs.writeFileSync(routesFilePath, "");
  }

  // Create the tests directory if it doesn't exist
  const testsPath = path.join("tests", moduleName);
  if (!fs.existsSync(testsPath)) {
    fs.mkdirSync(testsPath, { recursive: true });
  }

  // Create missing CRUD test directories and files
  crudOperations.forEach((operation) => {
    const testDirPath = path.join(testsPath, operation);
    if (!fs.existsSync(testDirPath)) {
      fs.mkdirSync(testDirPath);
    }
    const testCases = ["success", "error", "validation"];
    testCases.forEach((testCase) => {
      const testFilePath = path.join(
        testDirPath,
        `${operation}.${testCase}.test.ts`
      );
      if (!fs.existsSync(testFilePath)) {
        fs.writeFileSync(testFilePath, "");
      }
    });
  });

  console.log(`Module "${moduleName}" created successfully.`);
  rl.close();
};

createModule();
