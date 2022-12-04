const APP_ENV = require('../config/application.properties')
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const { AdminModel }= require("../models/AdminModel")
const { UserModel }= require("../models/UserModel")
const { SubAdminModel }= require("../models/SubAdminModel")
exports.verifyAdminToken = async (req, res, next) => {
    // check header or url parameters or post parameters for token
    let { access_token } = req.headers;
    if (!access_token) return res.status(401).send({ auth: false, message: 'No token provided' });

    // verifies secret and check expiration
    jwt.verify(access_token, APP_ENV.APP_ENV.JWT_PRIVATE_KEY, async function (err, decoded) {
        if (!err) {
            let admin = await AdminModel.findOne({ access_token: access_token });
            let subadmin = await SubAdminModel.findOne({ access_token: access_token });
            if (!admin) {
                if (!subadmin) {

                    // res.status(401).json({ message: "Invalid access_token." });
                    // return;
                }
            }
            if (admin) {
                req.adminData = admin;
            }
            else if (subadmin) {
                req.adminData = subadmin;
            }else{
                req.adminData = decoded;
            }

            // console.log("working..." + JSON.stringify(decoded))
            next();
        } else {
            return res.status(401).json({ auth: false, message: 'Token has been expired' });
        }
        // if everything is good, save to request for use in other routes
    });
};


