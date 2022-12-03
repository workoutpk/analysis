var express = require('express');
var router = express.Router();
var controller =  require('../controller/PlanetController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('planet resource');
});
router.post('/planet_add',  controller.planetAdd)
router.get ('/planet_get_all',  controller.planetAll)
module.exports = router;
