var express = require('express');
var router = express.Router();

const positionController = require('../controllers/positions')
const userController = require('../controllers/users')

router.get('/list',userController.isSignin,positionController.list)

module.exports = router;
