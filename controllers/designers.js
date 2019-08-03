const bcrypt = require('bcrypt')
const express = require('express')
const designers = express.Router()
const Mockup = require('../models/mockups.js')
const seed = require('../models/seed.js')

designers.get('/seed', (req, res) => {
	Mockup.create(seed, (err, data) => {
		res.redirect('/designers')
	})
})

designers.get('/new', (req, res) => {
    res.render('new.ejs');
});

designers.post('/', (req, res) => {
	Mockup.create(req.body, () => {
		res.redirect('/designers');
	})
})

designers.get('/', (req, res) => {
    Mockup.find({}, (error, allMockups) => {
        res.render('index.ejs',{
            mockups: allMockups
        });
    })
});

designers.get('/:id/show', (req, res)=>{
    Mockup.findById(req.params.id, (err, foundMockup)=>{
        res.render('show.ejs', {
            mockup: foundMockup
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
    			mockup: foundMockup
    		}
    	);
    });
});

designers.put('/:id', (req, res)=>{
    //{new: true} tells mongoose to send the updated model into the callback
    Mockup.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel)=>{
        res.redirect('/designers');
    });
});

module.exports = designers
