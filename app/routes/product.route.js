const express = require('express');
const product = require('../controllers/product.controller')

const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })


router.route('/create-product')
    .post(upload.single('image'), product.createProduct);

router.route('/get-products')
    .get(product.getProducts);

router.route('/get-product/:id')
    .get(product.getProductWithId);

router.route('/update-product/:id')
    .put(product.updateProduct);

router.route('/delete-product/:id')
    .delete(product.deleteProduct);

module.exports = router;