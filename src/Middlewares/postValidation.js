const Joi = require('joi');


module.exports.postSchema = Joi.object({
    title: Joi.string().required().min(5).max(50),
    text: Joi.string().required().min(10).max(1000),
});