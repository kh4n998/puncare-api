var express = require('express');
var router = express.Router();
var controller = require('../controller/contact.controller');
router.get('/', controller.get);
router.post('/create', controller.create);

router.delete('/:_id', controller.deleteContact);

module.exports = router;