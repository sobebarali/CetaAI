import Joi from "joi";

const getSchema = Joi.object({
 orgId: Joi.string().min(3).max(100).required(),
});

export default getSchema;
