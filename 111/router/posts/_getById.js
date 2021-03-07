const getOnePost = (req, res) => {
	if (req.post !== null) {
		res.json(req.post)
	} else {
		res.status(404).json({ error: 'No such post' })
	}
}

module.exports = getOnePost
