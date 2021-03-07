const Joi = require('joi')

const validCreateUser = Joi.object().keys({
	email: Joi.string()
		.trim()
		.email()
		.required(),
	password: Joi.string()
		.trim()
		.min(5)
		.max(10)
		.required(),
	name: Joi.string().trim()
})

module.exports = validCreateUser
