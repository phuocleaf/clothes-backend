const ApiError = require("../api-error");
const OrderService = require("../services/order.service");
const MongoDB = require("../utils/mongodb.util");

exports.createOrder = async (req, res, next) => {
    try {
        const order = new OrderService(MongoDB.client)
        const result = await order.create(req.body);
        res.send(result);
    } catch (error) {
        next(new ApiError(500, error.message));
    }
}

exports.getOrders = async (req, res, next) => {
    try {
        const order = new OrderService(MongoDB.client)
        const result = await order.getOrders();
        res.send(result);
    } catch (error) {
        next(new ApiError(500, error.message));
    }
}

exports.getOrderWithId = async (req, res, next) => {
    try {
        const order = new OrderService(MongoDB.client)
        const result = await order.getOrderWithId(req.params.id);
        res.send(result);
    } catch (error) {
        next(new ApiError(500, error.message));
    }
}

exports.getOrderWithUserId = async (req, res, next) => {
    try {
        const order = new OrderService(MongoDB.client)
        const result = await order.getOrderWithUserId(req.params.id);
        res.send(result);
    } catch (error) {
        next(new ApiError(500, error.message));
    }
}

exports.updateOrderStatus = async (req, res, next) => {
    try {
        const order = new OrderService(MongoDB.client)
        const result = await order.updateOrderStatus(req.body.id, req.body.status);
        res.send(result);
    } catch (error) {
        next(new ApiError(500, error.message));
    } 
}

exports.getOrderListUsingUserId = async (req, res, next) => {
    try {
        const order = new OrderService(MongoDB.client)
        const result = await order.getOrderListUsingUserId(req.params.id, req.params.status);
        res.send(result);
    } catch (error) {
        next(new ApiError(500, error.message));
    }
}

exports.getOrderCartListUsingOrderId = async (req, res, next) => {
    try {
        const order = new OrderService(MongoDB.client)
        const result = await order.getOrderCartListUsingOrderId(req.params.id);
        res.send(result);
    } catch (error) {
        next(new ApiError(500, error.message));
    }
}

exports.getOrderTotal = async (req, res, next) => {
    try {
        const order = new OrderService(MongoDB.client)
        const result = await order.getOrderTotalInMonth();
        res.send(result);
    } catch (error) {
        next(new ApiError(500, error.message));
    }
}

exports.getOrdersInMonth = async (req, res, next) => {
    try {
        const order = new OrderService(MongoDB.client)
        const result = await order.getOrdersInMonth();
        res.send(result);
    } catch (error) {
        next(new ApiError(500, error.message));
    }
}

exports.getBestSellingProductInMonth = async (req, res, next) => {
    try {
        const order = new OrderService(MongoDB.client)
        const result = await order.getBestSellingProductInMonth();
        res.send(result);
    } catch (error) {
        next(new ApiError(500, error.message));
    }
}


