var express = require('express');
var router = express.Router();
var controller = require('../controller/products.controller');
router.get('/', controller.get);
router.get('/:_id', controller.detailsProduct);

router.post('/create', controller.create);

router.put('/:_id', controller.updateProducts);

router.delete('/:_id', controller.deleteProduct);

module.exports = router;