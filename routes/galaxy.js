var express = require('express');
var router = express.Router();
var controller =  require('../controller/GalaxyController')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('galaxy resource');
});
router.post('/galaxy_add',  controller.galaxyAdd)
router.get ('/galaxy_get_all',  controller.galaxyAll)

module.exports = router;
