const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

// get all products
exports.getProducts = asyncHandler(async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json(products);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

// get product detail
exports.getProduct = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		res.status(200).json(product);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

// add new product
exports.createProduct = asyncHandler(async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.status(200).json(product);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

// update product
exports.updateProduct = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndUpdate(id, req.body);
		if (!product) {
			res.status(404);
			throw new Error(`cannot find any product with ID ${id}`);
		}
		const updatedProduct = await Product.findById(id);
		res.status(200).json(updatedProduct);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

// delete product
exports.deleteProduct = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);
		if (!product) {
			res.status(404);
			throw new Error(`cannot find any product with ID ${id}`);
		}
		res.status(200).json(product);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});
