const mongoose = require('mongoose');
const imageSchema = mongoose.Schema({
    path: { type: String, required: true }
});

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        images: [imageSchema]
    },
    {
        timestamps: true
    }
);
productSchema.index(
    { name: 'text', description: 'text' },
    { name: 'TextIndex' }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
