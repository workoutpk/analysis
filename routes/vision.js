var express = require('express');
var router = express.Router();
var controller =  require('../controller/VisionController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('vision resource');
});

router.post('/vision_add',  controller.visionAdd)
router.get ('/vision_get_all',  controller.visionAll)

module.exports = router;
