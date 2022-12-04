var express = require('express');
var router = express.Router();
var controller =  require('../controller/admin.controller')
var multer = require('multer');
var md5 = require('md5');
var path = require('path');
var auth  = require("../config/auth")
let storage = multer.diskStorage({
    destination: function(req, file, callback) {
        console.log("multer")
        // console.log(file)
        callback(null, './upload/admin');
    },
    filename: function(req, file, callback) {
        let fileUniqueName = md5(Date.now());
        callback(null, fileUniqueName + path.extname(file.originalname));
    }
});
let ec3upload = multer({ storage: storage });
/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('admin resource');
});
// router.post('/admin_add', ec3upload.any(), controller.adminAdd)
router.post('/admin_add', controller.adminAdd)
router.post('/admin_login',  controller.adminLogin)
router.get ('/admin_get_all', auth.verifyAdminToken, controller.adminAll)
router.post('/admin_login',  auth.verifyAdminToken, controller.adminAll)
router.post('/verify_otp', auth.verifyAdminToken, controller.adminVerifyOtp)
router.post('/set_password', auth.verifyAdminToken, controller.adminSetPassword)

module.exports = router;
