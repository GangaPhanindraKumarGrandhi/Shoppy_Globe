// Import required models and modules
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const mongoose = require('mongoose');
// Get all cart items for the user with product details
exports.getCartItems = async (req, res) => {
  try {
     // Fetch cart items belonging to the authenticated user
    const cartItems = await CartItem.find({ userId: req.user.id });
    const detailedCart = await Promise.all(cartItems.map(async (item) => {
      const product = await item.getProductDetails(); 
      return {
        _id: item._id,
        productId: product._id,
        quantity: item.quantity,
        title: product.title,
        price: product.price,
        rating: product.rating,
        image: product.Image
      };
    }));
    res.json(detailedCart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart items', error: error.message });
  }
};
// Add a new item to the cart or update quantity if it already exists
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let item = await CartItem.findOne({ userId: req.user.id, productId });
    if (item) {
      item.quantity += quantity;
    } else {
      item = new CartItem({ userId: req.user.id, productId, quantity });
    }
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add to cart', error: error.message });
  }
};
// Update the quantity of a specific cart item by its ID
exports.updateCartItem = async (req, res) => {
  try {
    const item = await CartItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (item.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    item.quantity = req.body.quantity;
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: 'Update failed', error: error.message });
  }
};
// Delete a cart item by its ID
exports.deleteCartItem = async (req, res) => {
  try {
    const item = await CartItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (item.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
// Delete the item from the cart
    await item.deleteOne();
    res.json({ message: 'Item removed' });
  } catch (error) {
    res.status(400).json({ message: 'Delete failed', error: error.message });
  }
};
