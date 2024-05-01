const express = require('express');
const user = require('../controllers/user.controller')

const router = express.Router();

router.route('/sign-up')
    .post(user.signUp);

router.route('/sign-in')
    .post(user.signIn);

router.route('/home')
    .get(user.home);

router.route('/get-user/:id')
    .get(user.getUserWithId);

router.route('/update-user/:id')
    .put(user.updateUserInfo);

router.route('/get-newest-user')
    .get(user.getNewestUser);

module.exports = router;