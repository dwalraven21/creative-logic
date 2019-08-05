const express = require('express')
const messages = express.Router()
const Mockup = require('../models/mockups.js')
const User = require('../models/users.js')
const Message = require('../models/messages.js')

// When a user clicks to add a new message
// They will be taken to form page to submit the message
messages.get('/:id/new', (req, res) => {
	// first we need some info about the mockup
	Mockup.findById(req.params.id, (err, foundMockup)=>{
		Message.find({}, (error, allMessages) => {
			res.render('messages/new.ejs', {
				message: allMessages,
				// we need to know who the sender is
				currentUser: req.session.currentUser,
				// and who the reciever is from the mockup data
				mockup: foundMockup
			})
		})
	})
})

// When a user sends the message (submits the form)
messages.post('/:id/new', (req, res) => {
	Mockup.findById(req.params.id, (err, foundMockup)=>{
		// we need to store the senders information
		req.body.sender = req.session.currentUser.username;
		// the mockup author's info
		req.body.recipient = foundMockup.author;
		// the message body
		Message.create(req.body, () => {
			console.log(req.body);
			Message.find({}, (error, allMessages) => {
				res.redirect('/messages')
			})
		})
	})
})

// allow user to view all messages
// will use logic on ejs page to make sure they can only view messages that they are the sender or reciever of
messages.get('/', (req, res) => {
	Message.find({}, (error, allMessages) => {
		if (req.session.currentUser){
			res.render('messages/index.ejs', {
				messages: allMessages,
				currentUser: req.session.currentUser,
			})
		// if they are not signed in they will return to sign in page
		} else {
			res.redirect('/sessions/new');
		}
	})
})

module.exports = messages
