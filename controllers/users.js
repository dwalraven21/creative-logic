const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

// shows our form
users.get('/new', (req, res) => {
	res.render('users/new.ejs')
})

// when we hit submit on our form
users.post('/', (req, res) => {
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
	User.create(req.body, (err, createUser) => {
		if (err) {
			console.log(err);
		} else {
			console.log(createUser);
			res.redirect('/')
		}
	})
})

module.exports = users
