import Joi from "joi";
import { typePayload } from "../types/create.types";

const createSchema = Joi.object<typePayload>({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(255).required(),
});

export default createSchema;
