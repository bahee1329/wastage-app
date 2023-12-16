const router =require('express').Router();
const usercontroller = require('../controllers/usercontroller');

router.delete('/:id',usercontroller.deleteUser);
router.get('/:id',usercontroller.getUser);

module.exports = router;