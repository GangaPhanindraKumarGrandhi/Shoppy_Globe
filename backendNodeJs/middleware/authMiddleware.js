const jwt = require('jsonwebtoken');
// Middleware to protect routes by verifying JWT token
exports.protect = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try {
    // Verify token and attach user data to request
    const decoded = jwt.verify(token, "shoppyGlobe");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
