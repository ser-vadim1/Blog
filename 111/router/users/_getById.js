const getOneUser = (req, res) => {
	
	if (req.user !== null) {
		res.json(req.user)
	} else {
		res.status(404).json({ error: 'No such user' })
	}
}

module.exports = getOneUser
