const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data', 
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Feth the previous cart
        // Read the JSON for an existing cart. That will return either an err or a cart.
        fs.readFile(p, (err, fileContent) => {
            // let the cart = an object with an array of products and a sum of the prices.
            let cart = {products: [], totalPrice: 0};
            // if it returns an err (i.e. there is no cart yet) then the cart is now = to, and parsed out to, the JSON content
            if (!err) {
                cart = JSON.parse(fileContent);
            }


            // Analyze the car => find existing product
            // check if an existing product has the same ID as this ID (the id being added)
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            // This now allows me to replace the product existing in the cart array already. down in the if statement where I check for it.
            const existingProduct = cart.products[existingProductIndex];


            // if the IDs match create an updated product with all the existing qualities of the existing product 
            // & set the quantity +1
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                // Right here I say replace (override) the existingProduct with the updatedProduct
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                // If we have a new product set the new variable updatedProduct (the new cart) with its id and qty: 1
                updatedProduct = { id: id, qty: 1};
                // Also update the products in the cart with all the old products of the cart [...cart.products]
                cart.products = [...cart.products, updatedProduct];
            }
            // And regardless of existing or not, update the cart.totalPrice with the product's Price
            cart.totalPrice = cart.totalPrice + +productPrice;
            // Now write the cart to the JSON file
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }
};