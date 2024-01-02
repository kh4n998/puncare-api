var express = require('express');
var router = express.Router();
var controller = require('../controller/services.controller')
router.get('/', controller.get);
router.get('/:_id', controller.detailsService);

router.post('/create', controller.create);

router.put('/:_id', controller.updateServices);

router.delete('/:_id', controller.deleteService);

module.exports = router;