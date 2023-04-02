const express = require('express');
const router = express.Router();
const {
    getProducts,
    addProducts,
    updateProducts,
    deleteProducts,
    getProductById
} = require('../controllers/productController');
const { verifyIsLoggedIn } = require('../MiddleWare/UserLoggedInVerify');

// router.use(verifyIsLoggedIn); // IF you want to check this Authentication then UnCommnet it , only able to manage this on simple req of get products because of time shortage
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/add', addProducts);
router.put('/update/:id', updateProducts);
router.delete('/delete/:id', deleteProducts);

module.exports = router;
