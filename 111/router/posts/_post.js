	const Joi = require('joi'),
	validateCreate = require('./validateCreate'),
	Post = require('../../models/Post')

const createPost = (req, res, next) =>
	Joi.validate(req.body, validateCreate, (err, result) => {
		if (err) {
			res.status(400).send({ error: err.details })
		} else {
			const post = new Post(req.body)
			post.postedBy = req.authUser._id
			post.save(err => (err ? next(err) : res.json(post)))
		}
	})

module.exports = createPost
