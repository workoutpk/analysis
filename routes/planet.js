var express = require('express');
var router = express.Router();
var controller =  require('../controller/planet.controller')
var auth  = require("../config/auth")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('planet resource');
});
router.post('/planet_add', auth.verifyAdminToken, controller.planetAdd)
router.get ('/planet_get_all', auth.verifyAdminToken, controller.planetAll)
module.exports = router;
