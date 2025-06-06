const mongoose = require('mongoose');
// Define schema for a user account
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
// Export the User model
module.exports = mongoose.model('User', userSchema);
