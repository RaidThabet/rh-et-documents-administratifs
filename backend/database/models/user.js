const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email:String,
  role: String,
  status: { type: String, enum: ['Actif', 'Inactif'], default: 'Inactif' },
  age: string,
  gender: { type: String, enum: ['Homme', 'Femme'] },
  grade: string,
  department: string,
  seniority: string,
});

const User = mongoose.model('User', userSchema);

module.exports = User;