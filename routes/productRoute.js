const express = require('express');
const Product = require('../models/productModel');
const {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post('/product', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;