const express = require('express');
const user = require('../controllers/order.controller');
const { route } = require('./user.route');

const router = express.Router();

router.route('/create-order')
    .post(user.createOrder);

router.route('/get-orders')
    .get(user.getOrders);

router.route('/get-order/:id')
    .get(user.getOrderWithId);

router.route('/get-order-user/:id')
    .get(user.getOrderWithUserId);

router.route('/update-order-status')
    .put(user.updateOrderStatus);

router.route('/get-order-list-user/:id/:status')
    .get(user.getOrderListUsingUserId);

router.route('/get-order-cart-list/:id/')
    .get(user.getOrderCartListUsingOrderId);

router.route('/get-order-total')
    .get(user.getOrderTotal);

router.route('/get-orders-in-month')
    .get(user.getOrdersInMonth);

router.route('/get-best-selling-product-in-month')
    .get(user.getBestSellingProductInMonth);

module.exports = router;