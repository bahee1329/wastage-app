const router = require('express').Router();
const orderController = require('../controllers/orderscontroller')


router.get('/:id',orderController.getUserOders)

module.exports=router;