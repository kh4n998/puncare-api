var express = require('express');
var router = express.Router();
var controller = require('../controller/typeProduct.controller')

router.get('/', controller.getType);

router.post('/create-type', controller.createType);

module.exports = router;