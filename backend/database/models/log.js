// const mongoose = require('mongoose');

// const logSchema = new mongoose.Schema({
//   action: String,
//   date: Date,
// });

// const Log = mongoose.model('Log', logSchema);

// module.exports = Log;

const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
  action: { type: String, required: true },
  message: { type: String, required: true },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})

const Log = mongoose.model('Log', logSchema);

module.exports = Log;