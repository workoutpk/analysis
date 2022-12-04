var express = require('express');
var router = express.Router();
var controller =  require('../controller/star.controller')
var auth  = require("../config/auth")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('star resource');
});

router.post('/star_add', auth.verifyAdminToken, controller.starAdd)
router.get ('/star_get_all',auth.verifyAdminToken,  controller.starAll)
module.exports = router;
