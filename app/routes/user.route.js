const express = require('express');
const user = require('../controllers/user.controller')

const router = express.Router();

router.route('/sign-up')
    .post(user.signUp);

router.route('/sign-in')
    .post(user.signIn);

router.route('/home')
    .get(user.home);

module.exports = router;