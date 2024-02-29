import Joi from "joi";

const addPdfschema = Joi.object({
  file: Joi.any()
    .required()
    .meta({ swaggerType: "file" })
    .description("PDF file"),
});

export default addPdfschema;

