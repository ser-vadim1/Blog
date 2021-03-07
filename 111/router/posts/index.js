const express = require('express'),
	router = express.Router(),
	multer = require('multer'),
	upload = multer({ dest: './public' }),
	Post = require('../../models/Post'),
	ensureToken = require('../auth/ensureToken'),
	uploadImage = require('./_put'),
	createPost = require('./_post'),
	deletePost = require('./_delete'),
	updatePost = require('./_patch'),
	getOnePost = require('./_getById'),
	getAllPosts = require('./_getAll')
	Search = require("./_search")

const getByIdPost = (req, res, next, id) =>
	Post.findOne({ _id: id }, (err, post) => {
		if (err) {
			res.json({ error: 'No such post' })
		} else {
			req.post = post
			next()
		}
	})

const ensureIsMine = (req, res, next) => {

	if (req.post.postedBy.toString() !== req.authUser._id.toString()) {
		res.status(403).json({ error: 'This is not your post' })
	} else {
		next()
	}
}

router
	.route('/')
	.post(ensureToken, createPost)
	.get(getAllPosts)
router
	.route('/:postId')
	.get(getOnePost)
	.patch(ensureToken, ensureIsMine, updatePost)
	.delete(ensureToken, ensureIsMine, deletePost)
router
	.route('/upload/:postId')
	.put(ensureToken, ensureIsMine, upload.single('image'), uploadImage)

	router
	.route("/search")
	.post(Search)

	
router.param('postId', getByIdPost)

module.exports = router
