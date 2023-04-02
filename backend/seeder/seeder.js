const connectDB = require('../config/db');
connectDB();

// Models
const User = require('../models/UserModel');
const Product = require('../models/ProductModel');

// Seeder Data
const UsersSeederData = require('./users');
const ProductsSeederData = require('./products');

const importData = async () => {
    try {
        await Product.collection.dropIndexes();
        await Product.collection.deleteMany({});
        await Product.insertMany(ProductsSeederData);

        await User.collection.dropIndexes();
        await User.collection.deleteMany({});
        await User.insertMany(UsersSeederData);

        console.log('Seeder data proceeded successfully');

        process.exit();
    } catch (error) {
        console.error('Error while proccessing seeder data', error);
        process.exit(1);
    }
};
importData();
