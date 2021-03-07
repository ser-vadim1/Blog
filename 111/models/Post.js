const mongoose = require('mongoose'),
	fs = require('fs'),
	path = require('path'),
	Schema = mongoose.Schema

const PostSchema = new Schema({
	postedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	image: {
		type: String,
		trim: true
	},
	title: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	dateCreated: {
		type: Date,
		default: Date.now
	},
	description: {
		type: String,
		trim: true
	},
	fullText: {
		type: String,
		required: true,
		trim: true,
	}
})

PostSchema.pre('remove', { document: true }, function(next) {
	this.image
		? fs.unlink(path.join(__dirname, `../public${this.image}`), next)
		: next()
})
PostSchema.index({ '$**': "text"})
module.exports = mongoose.model('Post', PostSchema)
