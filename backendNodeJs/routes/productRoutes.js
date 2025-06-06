const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById,createProduct,updateProduct,deleteProduct } = require('../controllers/productController');
// Get all products
router.get('/', getAllProducts);
// Get a single product by ID
router.get('/:id', getProductById);
// Create a new product
router.post('/', createProduct);
// Update an existing product by ID
router.put('/:id', updateProduct);
// Delete a product by ID
router.delete('/:id', deleteProduct);

// Export the router for use in the main app
module.exports = router;
