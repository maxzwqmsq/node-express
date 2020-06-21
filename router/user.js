var express = require('express');
var router = express.Router();
var userService = require('../service/userService');

router.get('/queryData', userService.queryData)
router.post('/getUserInfo', userService.getUserInfo)
router.post('/saveUseInfo', userService.saveUseInfo)
router.post('/updateUserInfo', userService.updateUserInfo)
router.post('/deleteUser', userService.deleteUser)
router.post('/setPassword', userService.setPassword)

module.exports = router;