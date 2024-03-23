import Joi from "joi";

const createSchema = Joi.object({
  userId: Joi.string().min(2).max(100).required(),
  orgId: Joi.string().min(2).max(100).required(),
  name: Joi.string().min(2).max(100).required(),
});

export default createSchema;
