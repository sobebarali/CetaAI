import Joi from "joi";

const updateSchema = Joi.object({
  orgId: Joi.string().min(2).max(100).required(),
  name: Joi.string().min(3).max(100),
  description: Joi.string().min(3).max(255),
});

export default updateSchema;
