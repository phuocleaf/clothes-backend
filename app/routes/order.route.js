const express = require('express');
const user = require('../controllers/order.controller')

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

router.route('/get-order-list-user/:id')
    .get(user.getOrderListUsingUserId);
module.exports = router;