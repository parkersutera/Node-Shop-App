// no longer needed thanks to product.js model
// const products = [];
const Product = require('../models/product');

exports.getAddProductPage = (req,res,next) => {
    res.render('add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddProductPage = (req,res,next) => {
        // console.log(req.body);
        // products.push({title: req.body.title}); // pushes the product post to the products array as an object with the title of the requests body
        const product = new Product(req.body.title);
        product.save();
        res.redirect('/');
    };

exports.getProducts = (req,res,next) => {
    Product.fetchAll(products => {
        res.render('shop', {
            prods: products, 
            pageTitle: 'Shop', 
            path: '/shop', 
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};