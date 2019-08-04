const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
	first_name: String,
	last_name: String,
	email: String,
	username: String,
	password: String,
	designer: Boolean,
	developer: Boolean,
})

const User = mongoose.model('User', userSchema)

module.exports = User
