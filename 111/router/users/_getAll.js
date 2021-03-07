const User = require('../../models/User')

const getAllUsers = async (req, res, next) => {
	let {skipUsers} = req.query

	
	try {
	let users =  await User.find({}, {password: 0}).skip(Number(skipUsers)).limit(10)
	const AmountUsers = await User.find({}).countDocuments()

	res.status(200).json({users: users, AmountUsers:AmountUsers })
	} catch (error) {
		return next(error)
	}

}

module.exports = getAllUsers
