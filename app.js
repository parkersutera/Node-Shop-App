const http = require('http');

const path = require('path');

// Packages
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const db = require('./util/database');

const app = express();

app.set('view engine', 'pug');
app.set('views', './shopApp/views');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

db.execute('SELECT * FROM products')
.then(result => {
    console.log(result[0], result[1]);
})
.catch(err => {
    console.log(err);
});

app.use(bodyParser.urlencoded({extended: false})); //this will parse all body text automatically. from the package 'body-parser'
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// You can leave this route get function as is but in the interest of MVC im linking the function in the controllers folder
// app.use((req,res,next) => {
//     res.status(404).render('404', {pageTitle: '404 Page Not Found'});
// });
app.use(errorController.get404Page);

app.listen(3000);