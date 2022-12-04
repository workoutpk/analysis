const { mongoose, } = require('../config/db.connection');
let adminSchema = new mongoose.Schema({
    user_status: {
        type: Number,
        default: 1  //Note: user_type 1 for admin,
    },
    email: {
        type: String,
        unique: true,
        default: null
    },
    full_name: {
        type: String,
        default: "Admin"
    },
    profile_image: {
        type: String,
        default: ''
    },
    access_token: {
        type: String,
        default: ''
    },
   
    otp_info: {
        otp: String,
        exp_time: String  //otp expiry time
    },
    country_code: {
        type: String,
        default: null
    },
    mobile_number: {
        type: String,
        unique: true,
        default: null
    },
    password: {
        type: String,
        default: null
    },
    device_type: {
        type: Number,
        default: 1
    },      // 1 for Android, 2 for IOS, 3 for Web
    device_token: {
        type: String,
        default: null
    }




}, {
    strict: true,
    collection: 'admin',
    timestamps: true,
    versionKey: false
});

const AdminModel = mongoose.model('admin', adminSchema);
module.exports = { AdminModel }