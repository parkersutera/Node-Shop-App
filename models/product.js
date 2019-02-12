// Imports to allow products to be saved in a file model as opposed to an array
const fs = require('fs');
const path = require('path');

// This would save our products in an array. Useful as well.
// const products = [];

const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data', 
    'products.json'
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
        cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    // save product created to array
    save() {
        getProductsFromFile(products => {
            // if this product already exists the product attributes are updated
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            }
            else {
                this.id = Math.random().toString(); // this creates an ID unique to the product that was just created
                products.push(this); //to ensure 'this' refers to the class use an => function while reading file
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        }); 
    }
    // get all products in this array
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
};