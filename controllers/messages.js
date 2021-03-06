const express = require('express')
const messages = express.Router()
const Mockup = require('../models/mockups.js')
const User = require('../models/users.js')
const Message = require('../models/messages.js')


// NEW - GET
// When a user clicks to add a new message
// They will be taken to form page to submit the message
messages.get('/:id/new', (req, res) => {
	// first we need some info about the mockup
	Mockup.findById(req.params.id, (err, foundMockup)=>{
		Message.find({}, (error, allMessages) => {
		if (req.session.currentUser){
			res.render('messages/new.ejs', {
				message: allMessages,
				// we need to know who the sender is
				currentUser: req.session.currentUser,
				// and who the reciever is from the mockup data
				mockup: foundMockup
			})
		} else {
			res.redirect('/sessions/new');
		}
		})
	})
})

// NEW - GET
// When a user clicks to accept a developers request
// They will be taken to form page to submit the message
messages.get('/:id/accept', (req, res) => {
	Message.findById(req.params.id, (err, foundMessage)=>{
	// first we need some info about the mockup
		Mockup.findById(foundMessage.mockup, (err, foundMockup)=>{
			if (req.session.currentUser){
			res.render('messages/accept.ejs', {
				// we need to send the message back to the original message sender
				message: foundMessage,
				// we need to know what mockup this is in reference to
				// so we can update the staus to "selected" and add the developer username
				mockup: foundMockup,
				// we need to know who the current sender is
				currentUser: req.session.currentUser,
			})
		} else {
			res.redirect('/sessions/new');
		}
		})
	})
})

// CREATE - POST
// When a user sends the message (submits the form)
messages.post('/:id/new', (req, res) => {
	Mockup.findById(req.params.id, (err, foundMockup)=>{
		// we need to store the senders information
		req.body.sender = req.session.currentUser.username;
		// the mockup author's info
		req.body.recipient = foundMockup.author;
		// the id of the mockup this is in reference to
		req.body.mockup = foundMockup.id;
		// the message body
		Message.create(req.body, () => {
			console.log(req.body);
			Mockup.find({}, (error, allMockups) => {
			if (req.session.currentUser){
				res.redirect('/messages')
			} else {
				res.redirect('/sessions/new');
			}
			})
		})
	})
})

// INDEX - GET
// allow user to view recieved messages
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

// SHOW - GET
// allow user to view sent messages
// will use logic on ejs page to make sure they can only view messages that they are the sender or reciever of
messages.get('/sent', (req, res) => {
	Message.find({}, (error, allMessages) => {
		if (req.session.currentUser){
			res.render('messages/sent.ejs', {
				messages: allMessages,
				currentUser: req.session.currentUser,
			})
		// if they are not signed in they will return to sign in page
		} else {
			res.redirect('/sessions/new');
		}
	})
})

// DESTOY - DELETE
// Allows the user to delete a message and redirects them to the inbox
messages.delete('/:id', (req, res)=>{
    Message.findByIdAndRemove(req.params.id, (err, data)=>{
	if (req.session.currentUser){
        res.redirect('/messages')
	} else {
		res.redirect('/sessions/new');
	}
    });
});

// DESTOY - DELETE
// Allows the user to delete a message and redirects them to the inbox
messages.delete('/sent/:id', (req, res)=>{
    Message.findByIdAndRemove(req.params.id, (err, data)=>{
	if (req.session.currentUser){
        res.redirect('/messages/sent')
	} else {
		res.redirect('/sessions/new');
	}
    });
});


// UPDATE - PUT
// When a user clicks Accept and Reply (submits the form)
// Dev gets a reply message including source files
// Note: this is the Message id, not the Mockup id
messages.put('/:id/accept', (req, res) => {

	Message.create(req.body, (error, newMessage) => {
		console.log(newMessage);
		console.log(error);
		// We are updating the mockup with new info
		Mockup.findByIdAndUpdate(newMessage.mockup, req.body, {new: true}, (err, updatedModel)=>{
					if (req.session.currentUser){
						// Send user back to messages
						res.redirect('/messages')
					} else {
						res.redirect('/sessions/new');
					}
		})
	})
})


module.exports = messages
