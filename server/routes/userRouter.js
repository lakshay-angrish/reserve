const router = require('express').Router();
const userController = require('../controllers/userController');

router.route('/signUp').post(userController.signUp);
router.route('/logIn').post(userController.logIn);

module.exports = router;
