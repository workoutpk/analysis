var express = require('express');
var router = express.Router();
var controller =  require('../controller/vision.controller')
var auth  = require("../config/auth")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('vision resource');
});

router.post('/vision_add', auth.verifyAdminToken,  controller.visionAdd)
router.get ('/vision_get_all', auth.verifyAdminToken,  controller.visionAll)

module.exports = router;
