const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  sender: {type: String, required: true },
  recipient: {type: String, required: true },
  message: {type: String, required: true },
});

const Message = mongoose.model('Messages', messageSchema);

module.exports = Message;
