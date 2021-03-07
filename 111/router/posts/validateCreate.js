const Joi = require('joi')

const validPost = Joi.object().keys({
	fullText: Joi.string()
		.trim()
		.min(20)
		.max(400)
		.required(),
	title: Joi.string()
		.trim()
		.min(5)
		.max(50)
		.required(),
	description: Joi.string()
		.trim()
		.max(80)
})

module.exports = validPost