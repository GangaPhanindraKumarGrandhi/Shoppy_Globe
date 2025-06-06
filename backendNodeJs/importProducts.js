const axios = require('axios');
const mongoose = require('mongoose');
const Product = require('./models/Product'); // adjust path if needed
// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/shoppyglobe');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
};
// Fetch and import products from external API
const importProducts = async () => {
  await connectDB();
  try {
    const response = await axios.get('https://dummyjson.com/products');
    const products = response.data.products;
// Format products to match your schema
    const formatted = products.map(p => ({
      thumbnail: p.thumbnail,
      title: p.title,
      price: p.price,
      rating: p.rating,
      description: p.description,
      category: p.category,
      stock: p.stock,
      weight: p.weight,
      returnPolicy: p.returnPolicy, 
      shippingInformation: p.shippingInformation, 
      warrantyInformation: p.warrantyInformation,
      reviews: p.reviews
    }));
    await Product.insertMany(formatted);
    console.log('Products imported successfully!');
    process.exit();
  } catch (err) {
    console.error('Error importing products:', err.message);
    process.exit(1);
  }
};
// Start import process
importProducts();
