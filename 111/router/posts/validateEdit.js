const Joi = require('joi')

const validPost = Joi.object().keys({
	fullText: Joi.string()
		.trim()
		.min(20)
		.max(400),
	title: Joi.string()
		.trim()
		.min(5)
		.max(50),
	description: Joi.string()
		.trim()
		.max(80)
})

module.exports = validPost
