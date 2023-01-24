const express = require('express');
const router = express.Router();
const HttpStatus = require('../module/status.module')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.status(HttpStatus.SUCCESS_STATUS).json({ data: "planet resource", message: 'success!' });
  // res.send('planet resource');
});

module.exports = router;
