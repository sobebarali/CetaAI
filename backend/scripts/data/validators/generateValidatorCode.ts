const generateValidatorCode = (moduleName: string, operation: string) => {
  const validatorCode = `
  import Joi from 'joi';

  const ${operation}Schema = Joi.object({
    // Add the rest of the fields here
  });

  export default ${operation}Schema;
`;

  return validatorCode;
};

export default generateValidatorCode;
