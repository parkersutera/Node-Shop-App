const path = require('path'); // core node.js module

const express = require('express');

// Everything commented out is the functional way of routing with no MVC
// const adminData = require('./admin');

// const products = adminData.products;

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/orders', shopController.getOrders);

router.get('/cart', shopController.getCart);

router.get('/checkout', shopController.getCheckout);
// router.get('/',(req,res,next) => {
//     console.log(adminData.products);
//     res.render('shop', {
//         prods: products, 
//         pageTitle: 'Shop', 
//         path: '/shop', 
//         hasProducts: products.length > 0,
//         activeShop: true,
//         productCSS: true
//     });
// });

module.exports = router;