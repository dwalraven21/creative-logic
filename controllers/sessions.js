const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

// form for new session/log in
sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs')
})

sessions.get('/something-wrong', (req, res) => {
	res.render('sessions/something-wrong.ejs')
})

sessions.delete('/', (req, res)=>{
    req.session.destroy(() => {
        res.redirect('sessions/new.ejs')
    })
})

sessions.post('/', (req, res) => {
  User.findOne({ username: req.body.username}, (err, foundUser) => {
    if(err) {
      console.log(err)
      res.render('sessions/something-wrong.ejs')
    } else if (!foundUser) {
      res.render('sessions/not-found.ejs')
    }else {
      if(bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect('/designers')
      } else {
        res.render('sessions/wrong-password.ejs')
      }
    }
  })
})

module.exports = sessions
