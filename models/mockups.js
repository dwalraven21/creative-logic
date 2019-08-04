const mongoose = require('mongoose')

const mockupSchema = new mongoose.Schema({
  name: {type: String, required: true },
  description: String,
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
