const express = require('express'),
	router = express.Router(),
	multer = require('multer'),
	upload = multer({ dest: './public' }),
	User = require('../../models/User'),
	ensureToken = require('../auth/ensureToken'),
	uploadAvatar = require('./_put'),
	createUser = require('./_post'),
	getOneUser = require('./_getById'),
	getAllUsers = require('./_getAll'),
	updateUser = require('./_patch'),
	deleteUser = require('./_delete')

const getByIdUser = (req, res, next, id) =>
	User.findOne({ _id: id }, { password: 0 }, (err, user) => {
		if (err) {
			res.status(404).json({ error: 'No such user' })
		} else {
			req.user = user
			next()
		}
	})

const ensureIsMine = (req, res, next) => {
	
	if (req.user._id.toString() !== req.authUser._id.toString()) {
		res.status(403).json({ error: 'This is not your user' })
	} else {
		next()
	}
}

router
	.route('/')
	.post(createUser)
	.get(getAllUsers)
router
	.route('/adjust/:userId')
	.get(getOneUser)
	.patch(ensureToken, ensureIsMine, updateUser)
	.delete(ensureToken, ensureIsMine, deleteUser)
router
	.route('/upload/:userId')
	.put(ensureToken, ensureIsMine, upload.single('avatar'), uploadAvatar)

router.param('userId', getByIdUser)

module.exports = router
