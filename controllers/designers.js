const bcrypt = require('bcrypt')
const express = require('express')
const designers = express.Router()
const Mockup = require('../models/mockups.js')
const User = require('../models/users.js')
const seed = require('../models/seed.js')

designers.get('/seed', (req, res) => {
	Mockup.create(seed, (err, data) => {
		res.redirect('/designers')
	})
})

designers.get('/new', (req, res) => {
	Mockup.find({}, (error, allMockups) => {
    res.render('new.ejs', {
		currentUser: req.session.currentUser,
		mockups: allMockups
	});
  });
});

designers.get('/myprojects', (req, res) => {
	Mockup.find({}, (error, allMockups) => {
		if(req.session.currentUser.designer === true){
    	res.render('myprojects.ejs', {
		mockups: allMockups,
		currentUser: req.session.currentUser,
		});
		} else {
		res.redirect('/sessions/new');
		}
	})
});

designers.post('/', (req, res) => {
	req.body.author = req.session.currentUser.username;
	req.body.email = req.session.currentUser.email;
	Mockup.create(req.body, () => {
		console.log(req.body);
		Mockup.find({}, (error, allMockups) => {
		res.render('myprojects.ejs', {
			currentUser: req.session.currentUser,
			mockups: allMockups
		});
	  });
	})
})

designers.get('/', (req, res) => {
    Mockup.find({}, (error, allMockups) => {
		if(req.session.currentUser){
	        res.render('index.ejs', {
			mockups: allMockups,
			currentUser: req.session.currentUser,
	    })
		} else {
	        res.redirect('/sessions/new');
	    }
    })
});

designers.get('/:id/show', (req, res)=>{
    Mockup.findById(req.params.id, (err, foundMockup)=>{
        res.render('show.ejs', {
            mockup: foundMockup,
			currentUser: req.session.currentUser,
        });
    });
});

designers.delete('/:id', (req, res)=>{
    Mockup.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/designers')
    });
});

designers.get('/:id/edit', (req, res)=>{
    Mockup.findById(req.params.id, (err, foundMockup)=>{
        res.render(
    		'edit.ejs',
    		{
    			mockup: foundMockup,
				currentUser: req.session.currentUser
    		}
    	);
    });
});


designers.put('/:id', (req, res)=>{
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
