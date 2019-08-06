const bcrypt = require('bcrypt')
const express = require('express')
const designers = express.Router()
const Mockup = require('../models/mockups.js')
const User = require('../models/users.js')
const seed = require('../models/seed.js')

// Uses Seed Data to populate the site with mockups
designers.get('/seed', (req, res) => {
	Mockup.create(seed, (err, data) => {
		res.redirect('/designers')
	})
})

// When a desginer clicks add a new mockup
designers.get('/new', (req, res) => {
	Mockup.find({}, (error, allMockups) => {
	// Will generate a form page and user current user to
    res.render('new.ejs', {
		// automatically add hidden data to the submission
		// which we can use later
		currentUser: req.session.currentUser,
		// Upon submisson the new object will be added to the mockups model
		mockups: allMockups
	});
  });
});

// When a designer clicks to view their own projects
designers.get('/myprojects', (req, res) => {
	Mockup.find({}, (error, allMockups) => {
		console.log(allMockups);
		// If they are a designer
		if(req.session.currentUser.designer === true || req.session.currentUser.developer === true ){
		// Will render the page with the key-value pairs mockups and currentUser
    	res.render('myprojects.ejs', {
		// We need these keys to display all mockups belonging to the current user.
		mockups: allMockups,
		currentUser: req.session.currentUser,
		});
		} else {
		res.redirect('/sessions/new');
		}
	})
});

// When a designer adds a new mockup (submits the form)
designers.post('/', (req, res) => {
	// We will use the user information to store the username and email associated with the account
	// and store it in the new mockup object
	req.body.author = req.session.currentUser.username;
	req.body.email = req.session.currentUser.email;
	Mockup.create(req.body, () => {
		Mockup.find({}, (error, allMockups) => {
		res.render('myprojects.ejs', {
			currentUser: req.session.currentUser,
			mockups: allMockups
		});
	  });
	})
})

// When a designer views the index page (or all mockups)
designers.get('/', (req, res) => {
	console.log(req);
    Mockup.find({}, (error, allMockups) => {
		console.log(allMockups);
		// if they are signed in
		if(req.session.currentUser){
	        res.render('index.ejs', {
			//render index page and createa key that uses the data found from Mockups
			mockups: allMockups,
			// we also need to use data from the current user to know which elements to display on the page (designer or developer view)
			currentUser: req.session.currentUser,
	    })
		// if they are not signed in, they will be redirected to the login page
		} else {
	        res.redirect('/sessions/new');
	    }
    })
});

// When a designer clicks to view a specific mockup
designers.get('/:id/show', (req, res)=>{
	// find that specific mockup and call it foundMockup
    Mockup.findById(req.params.id, (err, foundMockup)=>{
		// render the show page and use keys to use the foundMockup data and the currentUser Data
		// (so we know what elements to show the user)
        res.render('show.ejs', {
            mockup: foundMockup,
			currentUser: req.session.currentUser,
        });
    });
});


// Allows the user to delete a mockup and redirects them to the index
// The user will only see the delete button for their own projects (this is handled in ejs)
designers.delete('/:id', (req, res)=>{
    Mockup.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/designers')
    });
});

// This displays an edit form so the user can edit information about the mockup
// The user will only see the edit button for their own projects (this is handled in ejs)
designers.get('/:id/edit', (req, res)=>{
    Mockup.findById(req.params.id, (err, foundMockup)=>{
        res.render(
    		'edit.ejs',
			// we need the mockup and currentUser keys to  know what information to show to the user and add to the from
    		{
    			mockup: foundMockup,
				currentUser: req.session.currentUser
    		}
    	);
    });
});

// Part 2 of the edit process
// This takes the info the user submitted in the edit form
// edits the mockup object
// and returns them to the index
// The user will only see the edit button for their own projects (this is handled in ejs)
designers.put('/:id', (req, res)=>{
	// This if statement is required because the form has checkboxes which return a value of "on" or "null"
	// we want to translate this to true or false
	if (req.body.built === "on") {
		req.body.built = true
	} else {
		req.body.built = false
	}
	if (req.body.selected === "on") {
		req.body.selected = true
	} else {
		req.body.selected = false
	}
    //{new: true} tells mongoose to send the updated model into the callback
    Mockup.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel)=>{
        res.redirect('/designers');
    });
});

module.exports = designers
