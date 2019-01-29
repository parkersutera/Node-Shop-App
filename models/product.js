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
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    // save product created to array
    save() {
        getProductsFromFile( products => {
            products.push(this); //to ensure 'this' refers to the class use an => function while reading file
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        }); 
    }
    // get all products in this array
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
};