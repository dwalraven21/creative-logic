const bcrypt = require('bcrypt')
const express = require('express')
const partials = express.Router()
const Mockup = require('../models/mockups.js')
const User = require('../models/users.js')

partials.get('/', (req, res) => {
	if(req.session.currentUser){
        res.render('nav.ejs', {
		mockups: allMockups,
		currentUser: req.session.currentUser,
    })
	} else {
        res.redirect('/sessions/new');
    }
})

partials.delete('/', (req, res)=>{
    req.session.destroy(() => {
        res.redirect('/sessions/new')
    })
})

module.exports = partials
