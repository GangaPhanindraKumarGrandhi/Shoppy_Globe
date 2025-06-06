const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
// Connect to MongoDB
connectDB();
const app = express();
// Middleware for parsing JSON 
app.use(express.json());
app.use(cors());
// Route handlers
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/', authRoutes);
// Start the server on defined port
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
