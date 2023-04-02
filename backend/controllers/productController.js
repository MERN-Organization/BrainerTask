const ProductModel = require('../models/ProductModel');
const imageValidator = require('../Utils/imageValidate');

const getProducts = async (req, res, next) => {
    const recordsPerPage = req.query.recordsPerPage || 2;
    const allProducts = [];
    const pageNum = Number(req.query.pageNum) || 1;
    let sort = {};
    let query = {};
    let queryCondition = false;

    let priceQueryCondition = {};
    if (req.query.price) {
        queryCondition = true;
        priceQueryCondition = {
            price: { $lte: Number(req.query.price) }
        };
    }

    let searchQueryCondition = {};
    const searchQuery = req.query.searchQuery ?? '';
    if (searchQuery) {
        queryCondition = true;
        searchQueryCondition = {
            $text: { $search: searchQuery }
        };
    }

    if (queryCondition) {
        query = {
            $and: [priceQueryCondition, searchQueryCondition]
        };
    }

    let sortOption = req.query.sort || '';
    if (sortOption) {
        let sortOpt = sortOption.split('_');
        sort = {
            [sortOpt[0]]: Number(sortOpt[1])
        };
    }
    try {
        const totalProducts = await ProductModel.countDocuments(query);
        const allProducts = await ProductModel.find(query)
            .skip(recordsPerPage * (pageNum - 1))
            .sort(sort)
            .limit(recordsPerPage);

        res.json({
            pageNum,
            totalProducts,
            paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
            allProducts
        });
    } catch (err) {
        next(err);
    }
};

// add product
const addProducts = async (req, res, next) => {
    try {
        const product = new ProductModel({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity
            // images: req.file.image,
        });

        let result = await product.save();
        let getAllProducts = await ProductModel.find({});
        res.status(200).send({
            msg: 'Product Added Successfully',
            result,
            allProducts: { getAllProducts }
        });
    } catch (error) {
        next(error);
    }
};

// update product
const updateProducts = async (req, res) => {
    try {
        let result = await ProductModel.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        if (result) {
            res.send({ msg: 'Product Updated Successfully', result });
        } else {
            res.send({ result: 'No Record Found' });
        }
    } catch (error) {
        res.send(error);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const ProductById = await ProductModel.findById(req.params.id);
        res.json(ProductById);
    } catch (err) {
        next(err);
    }
};

// delete product
const deleteProducts = async (req, res, next) => {
    try {
        let id = await ProductModel.findOne({ _id: req.params.id });
        if (id) {
            let result = await ProductModel.deleteOne({ _id: req.params.id });
            let getAllProducts = await ProductModel.find({});
            res.send({
                msg: 'Product Deleted Successfully',
                result,
                allProducts: getAllProducts
            });
        } else {
            res.send({ result: 'No Record Found' });
        }
    } catch (error) {
        next(error);
    }
};

const adminFileUpload = async (req, res, next) => {
    try {
        if (!req.files || !!req.files.images === false) {
            return res.status(400).send('No Files are uploaded');
        }

        const errorExistOrnot = imageValidator(req.files.images);
        if (errorExistOrnot.error) {
            res.json({ error: errorExistOrnot.error });
        }

        const { v4: uuidv4 } = require('uuid');
        const path = require('path');
        const uploadDirectory = path.resolve(
            __dirname,
            '../../frontend',
            'public',
            'images',
            'products'
        );

        let imagesTable = [];
        if (Array.isArray(req.files.images)) {
            imagesTable = req.files.images;
        } else {
            imagesTable.push(req.files.images);
        }

        for (let image of imagesTable) {
            var uploadPath =
                uploadDirectory + '/' + uuidv4() + path.extname(image.name);
            image.mv(uploadPath, function (err) {
                if (err) {
                    return res.send(err);
                }
            });
        }
        return res.send('Product Image Uploaded Succesfully');
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getProducts,
    addProducts,
    updateProducts,
    deleteProducts,
    getProductById,
    adminFileUpload
};
