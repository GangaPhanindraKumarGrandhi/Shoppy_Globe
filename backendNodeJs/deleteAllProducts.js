const mongoose = require('mongoose');
const Product = require('./models/Product');
// Function to delete all products from the database
const deleteAllProducts = async () => {
  try {
// Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/shoppyglobe');
    console.log('MongoDB connected');
// Delete all documents in the Product collection
    const result = await Product.deleteMany({});
    console.log(`${result.deletedCount} products deleted.`);
    process.exit();
  } catch (err) {
    console.error('Error deleting products:', err.message);
    process.exit(1);
  }
};
// Execute the deletion function
deleteAllProducts();
