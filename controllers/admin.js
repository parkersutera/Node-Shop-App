const Product = require('../models/product');

exports.getAddProductPage = (req,res,next) => {
    res.render('admin/edit-product', {      // was res.render('admin/add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        editing: false
        // productCSS: true,
        // activeAddProduct: true           this is all taken out to be replaced with edit product view
    });
};

exports.postAddProductPage = (req,res,next) => {
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const description = req.body.description;
        const price = req.body.price;
        const product = new Product(null,title,imageUrl,description,price);
        product
        .save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
        res.redirect('/');
    };

// this gets fancy. So this will serve the edit-product page IF edit mode is true and IF the product has an ID
exports.getEditProductPage = (req,res,next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });
};

exports.postEditProductPage = (req,res,next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    updatedProduct.save();
    res.redirect('/admin/product-list');
};

exports.getProductList = (req,res,next) => {
    Product.fetchAll(products => {
        res.render('admin/product-list', {
            prods: products, 
            pageTitle: 'Admin Products', 
            path: '/admin/product-list', 
        });
    });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/product-list');
};