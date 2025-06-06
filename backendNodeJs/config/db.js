// Import the mongoose library for MongoDB interactions
const mongoose = require('mongoose');
// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
     // Attempt to connect to the local MongoDB instance with the specified database name
    await mongoose.connect('mongodb://localhost:27017/shoppyglobe');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
// Export the connectDB function for use in other parts of the application
module.exports = connectDB;
