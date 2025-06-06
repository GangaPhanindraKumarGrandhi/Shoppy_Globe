// Import the User model from the models directory
// Import jsonwebtoken for creating and verifying JWT tokens
// Import bcryptjs for hashing and comparing passwords
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Controller function to handle user registration
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered' });
};
// Controller function to handle user login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    // Generate a JWT token valid for 1 day
    const token = jwt.sign({ id: user._id }, "shoppyGlobe", { expiresIn: '1d' });
    // Send the token in the response
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
