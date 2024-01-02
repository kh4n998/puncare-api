var express = require('express');
var router = express.Router();
var controller = require('../controller/users.controller')

router.post('/login', controller.login);
router.post('/admin', controller.loginAdmin);
router.post('/create', controller.create);
router.post('/forgot-pw', controller.forgotPW);
router.post('/forgot-pw-admin', controller.forgotPWAdmin);
router.post('/:_id/reset-pw', controller.resetPW);
router.post('/logout', controller.logout);

router.put('/:_id/change-password', controller.updatePassword)
router.put('/:_id/update-info', controller.updateUser);

module.exports = router;