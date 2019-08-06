const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  sender: {type: String, required: true },
  recipient: {type: String, required: true },
  messageType: String,
  message: {type: String, required: true },
  mockup: {type: String, required: true },
  source: {
	  type: String,
	  default: '',
  },
  liveURL: {
	  type: String,
	  default: '',
  }

});

const Message = mongoose.model('Messages', messageSchema);

module.exports = Message;
