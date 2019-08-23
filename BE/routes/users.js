var express = require('express');
var router = express.Router();

const userColltroller = require('../controllers/users')

router.post('/signup',userColltroller.signup)
router.post('/signin',userColltroller.signin)
router.get('/isSignin',userColltroller.isSignin)
router.get('/signout',userColltroller.signout)

module.exports = router;
