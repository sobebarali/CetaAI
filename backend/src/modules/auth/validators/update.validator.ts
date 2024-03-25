import Joi from "joi";

const updateSchema = Joi.object({
  email: Joi.string().email(),
  phoneNumber: Joi.string().pattern(new RegExp("^[0-9]{10}$")),
  emailVerified: Joi.boolean(),
  password: Joi.string().min(6),
  displayName: Joi.string().min(3).max(30),
  photoURL: Joi.string().uri(),
  disabled: Joi.boolean(),
});

export default updateSchema;
