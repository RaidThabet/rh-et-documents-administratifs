const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email:String,
  role: String,
  status: { type: String, enum: ['Actif', 'Inactif'], default: 'Inactif' },
  age: String,
  gender: { type: String, enum: ['Homme', 'Femme'] },
  grade: String,
  department: String,
  seniority: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;