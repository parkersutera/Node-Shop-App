const path = require('path'); // core node.js module

const express = require('express');

// Everything commented out is the functional way of routing with no MVC
// const adminData = require('./admin');

// const products = adminData.products;

const router = express.Router();

const productsController = require('../controllers/products');

router.get('/', productsController.getProducts);
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