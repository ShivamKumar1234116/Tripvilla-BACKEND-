const mongoose = require('mongoose');
const userSchema = require('../schemas/userschema');

const User = mongoose.model('User', userSchema);

module.exports = User;
