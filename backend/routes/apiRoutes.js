const express = require('express');
const app = express();
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');

app.use('/users', userRoutes);
app.use('/products', productRoutes);

module.exports = app;
