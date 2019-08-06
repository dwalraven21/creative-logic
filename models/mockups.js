const mongoose = require('mongoose')

const mockupSchema = new mongoose.Schema({
  name: {type: String, required: true },
  author: String,
  email: String,
  description: String,
  img: String,
  developer: String,
  selected: {
	  type: Boolean,
	  default: false
  },
  built: {
  	type: Boolean,
  	default: false
  },
  liveURL: String,
});

const Mockup = mongoose.model('Mockup', mockupSchema);

module.exports = Mockup;
