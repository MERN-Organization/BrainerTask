require('dotenv').config();
const mongoose = require('mongoose');
const url = process.env.MONGO_URI;
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connection With mongoDb successfull');
    } catch (error) {
        console.log('Error in Mongo Connection', error);
        process.exit(1);
    }
};

module.exports = connectDB;
