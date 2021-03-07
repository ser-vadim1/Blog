const Joi = require('joi'),
	validateEdit = require('./validateEdit'),
	Post = require('../../models/Post')

const updatePost = (req, res, next) =>
	Joi.validate(req.body, validateEdit, (err, result) => {
		if (err) {
			res.status(400).send({ error: err.details })
		} else {
			Post.findByIdAndUpdate(
				req.post._id,
				req.body,
				{ new: true },
				(err, post) => (err ? next(err) : res.json(post))
			)
		}
	})

module.exports = updatePost
