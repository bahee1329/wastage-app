const router =require('express').Router();
const cardController = require('../controllers/cardcontrollers')

router.get('/find/:id',cardController.getCard);
router.post('/',cardController.addCard);
router.post('/quantity',cardController.decrementCarditem);
router.delete('/:cardItemId',cardController.deleteCard);

module.exports = router;