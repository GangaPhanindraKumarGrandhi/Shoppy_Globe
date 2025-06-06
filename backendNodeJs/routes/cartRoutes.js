const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getCartItems,
  addToCart,
  updateCartItem,
  deleteCartItem,
} = require('../controllers/cartController');
// Initialize Express router
const router = express.Router();
router.get('/', protect, getCartItems);
router.post('/', protect, addToCart);
router.put('/:id', protect, updateCartItem);
router.delete('/:id', protect, deleteCartItem);
// Export the router to use in the main application
module.exports = router;
