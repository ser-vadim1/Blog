const Joi = require('joi'),
	validateCreate = require('./validateCreate'),
	User = require('../../models/User')

const createUser = (req, res, next) =>
	Joi.validate(req.body, validateCreate, (err, result) => {
		if (err) {
			res.status(400).send({ error: err.details })
		} else {
			let user = new User(req.body)
			user.save(err => {
				if (err) {
					next(err)
				} else {
					let resUser = JSON.stringify(user)
					resUser = JSON.parse(resUser)
					delete resUser.password
					res.json(resUser)
				}
			})
		}
	})

module.exports = createUser
