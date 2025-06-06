const mongoose = require('mongoose');
// Define schema for a product in the store
const productSchema = new mongoose.Schema({
  thumbnail:String,
  title:String,
  price:Number,
  rating:Number,
  description:String, 
  category:String,
  stock:Number,
  weight:Number,
  returnPolicy:String,
  shippingInformation:String,
  warrantyInformation:String,
  reviews:Array
});
// Export the Product model for use in the app
module.exports = mongoose.model('Product', productSchema);
 