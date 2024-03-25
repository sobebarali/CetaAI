import Joi from "joi";

const createSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(255).required(),
});

export default createSchema;
