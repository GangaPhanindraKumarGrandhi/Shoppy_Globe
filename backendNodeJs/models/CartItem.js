const mongoose = require('mongoose');
const Product = require('./Product');
// Define the CartItem schema with references to User and Product
const cartItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Enables population of product data
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
});
// Custom instance method to fetch full product details
cartItemSchema.methods.getProductDetails = async function () {
  return await Product.findById(this.productId);
};
// Export the CartItem model
module.exports = mongoose.model('CartItem', cartItemSchema);
