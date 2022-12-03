var express = require('express');
var router = express.Router();
var controller =  require('../controller/StarController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('star resource');
});

router.post('/star_add',  controller.starAdd)
router.get ('/star_get_all',  controller.starAll)
module.exports = router;
