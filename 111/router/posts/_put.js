const fs = require('fs'),
	path = require('path'),
	Post = require('../../models/Post')

const uploadImage = (req, res) => {
	if (!req.file) {
		res.status(404).json({ error: 'No file' })
	} else {
		!fs.existsSync('./public/users/' + req.authUser._id) &&
			fs.mkdirSync('./public/users/' + req.authUser._id)

		const extension = `${path
				.extname(req.file.originalname)
				.toLowerCase()}`,
			newPath = `../../public/users/${req.authUser._id}/${
				req.file.filename
			}`,
			tempPath = path.join(
				__dirname,
				`../../public/${req.file.filename}`
			),
			targetPath = path.join(__dirname, `${newPath}${extension}`)

		fs.rename(tempPath, targetPath, () => {
			let url = `/users/${req.authUser._id}/${
				req.file.filename
			}${extension}`

			Post.findOne({ _id: req.post._id }, (err, post) => {
				if (err) {
					res.status(404).json({ error: 'No such post' })
				} else {
					fs.unlink(
						path.join(__dirname, `../../public${post.image}`),
						() => {
							Post.findByIdAndUpdate(
								req.post._id,
								{ image: url },
								{ new: true },
								(err, post) =>
									err ? next(err) : res.json(post)
							)
						}
					)
				}
			})
		})
	}
}

module.exports = uploadImage
