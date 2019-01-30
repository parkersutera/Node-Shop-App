const path = require('path'); // core node.js module

const express = require('express');


const router = express.Router();

const shopController = require('../controllers/shop');


router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// any specific routes under the /products route must be used before the : route 
//router.get('/products/delete');

// the : means there will be a variable as a segment of the route
router.get('/products/:productId', shopController.getProduct);

router.get('/orders', shopController.getOrders);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/checkout', shopController.getCheckout);


module.exports = router;