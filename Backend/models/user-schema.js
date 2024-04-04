const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number,
    token: String,
    
});

const User = mongoose.model('users', userSchema);

module.exports = User;