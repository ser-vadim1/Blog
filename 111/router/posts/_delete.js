const deletePost = (req, res, next) =>
	req.post.remove(err =>
		err
			? res.status(400).json({ error: 'No such user' })
			: res.json({ message: 'Deleted successfully' })
	)

module.exports = deletePost
