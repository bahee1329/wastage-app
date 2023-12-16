const router = require('express').Router();
const { model } = require('mongoose');
const productController =require('../controllers/productcontrollers');


router.get('/',productController.getAllProduct)
router.get('/:id',productController.getProduct)
router.get('/search/:key',productController.searchProduct)
router.post('/',productController.createProduct)

module.exports =router