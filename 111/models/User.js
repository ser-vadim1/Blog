const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	fs = require('fs'),
	path = require('path'),
	Post = require('./Post')

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	name: { type: String },
	dateCreated: {
		type: Date,
		default: Date.now
	},
	avatar: {
		type: String,
		trim: true
	}
})

UserSchema.pre('remove', { document: true }, function(next) {
	this.avatar
		? fs.unlink(path.join(__dirname, `../public${this.avatar}`), next)
		: next()
})

module.exports = mongoose.model('User', UserSchema)
