const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
 // Initialize Express router
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
// Export the router to use in the main app
module.exports = router;
