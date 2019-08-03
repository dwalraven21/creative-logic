const mongoose = require('mongoose')

const mockupSchema = new mongoose.Schema({
  name: {type: String, required: true },
  description: {
	  type: String,
	  default: 'no information provided'
  },
  img: String,
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
