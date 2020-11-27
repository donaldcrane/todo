import Joi from "joi";

const validateComment = comment => {
  const schema = Joi.object({
    userId: Joi.string().required()
      .empty().guid({ version: "uuidv4" })
      .messages({
        "any.required": "userID is required.",
        "string.empty": "userID cannot be an empty field.",
        "string.base": "userID must be a string.",
        "string.guid": "userID must be a UUID"
      }),
    task: Joi.string().required().min(3).max(500)
      .empty()
      .messages({
        "any.required": "comment is required.",
        "string.empty": "comment cannot be an empty field.",
        "string.base": "comment must be a string.",
        "string.min": "comment length must be at least 3 characters long",
        "string.max": "only 500 characters allowed for a comment",
      }),
  }).options({ abortEarly: true });
  return schema.validate(comment);
};
const validateId = ids => {
  const schema = Joi.object({
    userId: Joi.string().required()
      .empty().guid({ version: "uuidv4" })
      .messages({
        "any.required": "ID not provided. Please provide an ID.",
        "string.empty": "ID cannot be an empty field.",
        "string.base": "ID must be a string.",
        "string.guid": "ID must be a UUID"
      }),
  }).options({ abortEarly: false });
  return schema.validate(ids);
};
export { validateId, validateComment };
