const Joi = require('joi');

module.exports.userSchema = Joi.object({
    
        fullname: Joi.string().required().min(3).max(30),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });
