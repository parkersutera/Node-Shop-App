const Product = require('../models/product');
const Cart =require('../models/cart');

// gets all the products that exist
exports.getProducts = (req,res,next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product-list', {
                prods: rows, 
                pageTitle: 'All Products', 
                path: '/products'
            });
        })
        .catch(err => console.log(err));
};

// gets a single product's id to be used where ever
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(([product]) => {
        res.render('shop/product-detail', {
            product: product[0], 
            pageTitle: product.title,
            path: '/products'
        });
    })
    .catch(err => console.log(err));
};

// again gets all products for the index page tho
exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/index', {
                prods: rows, 
                pageTitle: 'Shop', 
                path: '/', 
            });
        })
        .catch(err => console.log(err));
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
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Cart',
                products: cartProducts
            });
        });
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/');
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect("/cart");
    });
};

// gets the checkout page
exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout'), {
        path: '/checkout',
        pageTitle: 'Checkout'
    }
}