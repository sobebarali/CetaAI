import Joi from "joi";

const getSchema = Joi.object({
  email: Joi.string().email(),
});

export default getSchema;
