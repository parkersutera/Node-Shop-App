const path = require('path');

const express = require('express');

// const rootDir = require('../helpers/path.js');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProductPage);
router.get('/product-list', adminController.getProductList);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProductPage);

router.get('/edit-product/:productId', adminController.getEditProductPage);
router.post('/edit-product', adminController.postEditProductPage);

router.post('/delete-product', adminController.postDeleteProduct);
// Everything commented out is the functional way of routing with no MVC
// const products = [];

// You can leave this route get function as is but in the interest of MVC im linking the function in the controllers folder
// router.get('/add-product', (req,res,next) => {
//     res.render('add-product', {
//         pageTitle: 'Add Product', 
//         path: '/admin/add-product',
//         productCSS: true
//     });
// });

// You can leave this route get function as is but in the interest of MVC im linking the function in the controllers folder
// router.post('/add-product', (req,res,next) => {
//     // console.log(req.body);
//     products.push({title: req.body.title}); // pushes the product post to the products array as an object with the title of the requests body
//     res.redirect('/');
// });

module.exports = router;
// exports.routes = router;
// exports.products = products;