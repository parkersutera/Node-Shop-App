// no longer needed thanks to product.js model
// const products = [];
const Product = require('../models/product');

// gets all the products that exist
exports.getProducts = (req,res,next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products, 
            pageTitle: 'All Products', 
            path: '/products'
        });
    });
};

// gets a single product's id to be used where ever
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        console.log(product);
    });
    res.redirect('/');
};

// again gets all products for the index page tho
exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products, 
            pageTitle: 'Shop', 
            path: '/', 
        });
    });
};

// get all orders if there were any
exports.getOrders = (req,res,next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

//gets the cart page
exports.getCart = (req,res,next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Cart'
    });
};

// gets the checkout page
exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout'), {
        path: '/checkout',
        pageTitle: 'Checkout'
    }
}