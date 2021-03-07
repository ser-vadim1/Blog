const Post = require('../../models/Post')

const getAllPosts = async (req, res, next) => {
	let query = {}
	let {valueSort} = req.query

	try {
	
		req.query.postedBy && (query.postedBy = req.query.postedBy)
	
	let GetPosts = await Post.find(query).sort({dateCreated: valueSort  ? -1 : 1}).limit(4).skip(Number(req.query. skipPosts))
	let AmountPosts =  await Post.find(query).countDocuments()

	

	res.status(200).json({Posts: GetPosts, AmountPosts:AmountPosts})

	} catch (error) {
		return next(error)
	}

}

module.exports = getAllPosts
