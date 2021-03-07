const Joi = require('joi')

const validEditUser = Joi.object().keys({
	name: Joi.string()
		.trim()
		.required()
})

module.exports = validEditUser
