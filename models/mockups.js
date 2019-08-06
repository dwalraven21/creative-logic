const mongoose = require('mongoose')

const mockupSchema = new mongoose.Schema({
  name: {type: String, required: true },
  author: String,
  email: String,
  description: String,
  img: String,
  developer: String,
  selected: Boolean,
  built: Boolean,
  liveURL: String,
});

const Mockup = mongoose.model('Mockup', mockupSchema);

module.exports = Mockup;
