var express = require('express');
var router = express.Router();
var controller = require('../controller/orders.controller');
router.get('/', controller.get);
router.post('/create', controller.create);

router.put('/:_id', controller.updateStatus);

router.delete('/:_id', controller.deleteOrder);

module.exports = router;