var express = require('express');
var router = express.Router();
var controller =  require('../controller/galaxy.controller')
var auth  = require("../config/auth")
/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('galaxy resource');
});
router.post('/galaxy_add', auth.verifyAdminToken, controller.galaxyAdd)
router.get ('/galaxy_get_all', auth.verifyAdminToken, controller.galaxyAll)

module.exports = router;
