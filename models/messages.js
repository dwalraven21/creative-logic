const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  sender: {type: String, required: true },
  recipient: {type: String, required: true },
  type: String,
  message: {type: String, required: true },
  mockup: String,
  source: String,
  liveURL: String,

});

const Message = mongoose.model('Messages', messageSchema);

module.exports = Message;
