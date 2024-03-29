
  import Joi from 'joi';

  const listSchema = Joi.object({
    userId: Joi.string().min(3).max(30).required(),
    orgId: Joi.string().min(3).max(30).required(),
    // Add the rest of the fields here
  });

  export default listSchema;
