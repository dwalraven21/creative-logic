const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const Mockup = require('../models/mockups.js')
const User = require('../models/users.js')

// shows our form
users.get('/new', (req, res) => {
	res.render('users/new.ejs')
})

// when we hit submit on our form
users.post('/', (req, res) => {
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
	if (req.body.designer === "on") {
		req.body.designer = true
	} else {
		req.body.designer = false
	}
	if (req.body.developer === "on") {
		req.body.developer = true
	} else {
		req.body.developer = false
	}

	User.create(req.body, (err, createUser) => {
		if (err) {
			console.log(err);
		} else {
			Mockup.find({}, (error, allMockups) => {
				res.render('index.ejs', {
				currentUser: req.session.currentUser,
				mockups: allMockups
			})
	    })
	  }
	})
})

module.exports = users
