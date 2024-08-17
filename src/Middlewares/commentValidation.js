const Joi = require('joi');

module.exports.commentSchema = Joi.object({
    message: Joi.string().required().min(3).max(50),
});