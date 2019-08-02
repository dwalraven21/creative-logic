const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

// form for new session/log in
sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs')
})

sessions.delete('/', (req, res)=>{
    req.session.destroy(() => {
        res.redirect('/')
    })
})

sessions.post('/', (req, res) => {
  console.log('this is req.body ', req.body)
  console.log('this is password', req.body.password)
  User.findOne({ username: req.body.username}, (err, foundUser) => {
    if(err) {
      console.log(err)
      res.send('oops something went wrong')
    } else if (!foundUser) {
      res.send('user not found!')
    }else {
      if(bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect('/')
      } else {
        res.send('<a href="/">wrong password</a>')
      }
    }
  })
})

module.exports = sessions
