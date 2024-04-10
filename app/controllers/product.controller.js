const ApiError = require("../api-error");
const ProductService = require("../services/product.service");
const MongoDB = require("../utils/mongodb.util");


exports.createProduct = async (req, res, next) => {
    try {
        const product = new ProductService(MongoDB.client)
        const result = await product.create(req);
        res.send(result);
    } catch (error) {
        next(new ApiError(500, error.message));
    }
}

exports.getProducts = async (req, res, next) => {
    try {
        const product = new ProductService(MongoDB.client)
        const result = await product.getProducts();
        res.send(result);
    } catch (error) {
        next(new ApiError(500, error.message));
    }
}

exports.getProductWithId = async (req, res, next) => {
    try {
        const product = new ProductService(MongoDB.client)
        const result = await product.getProductWithId(req.params.id);
        res.send(result);
    } catch (error) {
        next(new ApiError(500, error.message));
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const product = new ProductService(MongoDB.client)
        console.log(req.body);
        console.log(req.params.id);
        const result = await product.updateProduct(req.params.id, req.body);
        res.send(result);
    } catch (error) {
        next(new ApiError(500, error.message));
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = new ProductService(MongoDB.client)
        const result = await product.deleteProduct(req.params.id);
        result.ok = true;
        res.send(result);
    } catch (error) {
        next(new ApiError(500, error.message));
    }
}