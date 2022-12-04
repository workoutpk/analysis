const { mongoose, } = require('../config/db.connection');
let SubAdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile_number: {
        type: Number,
        required: true
    },
    login_email: {
        type: String,
        default: null,
        unique: true,
    },
    login_password: {
        type: String,
        default: null,
    },
    access_token: {
        type: String,
        default: null,
        
    },
    region: {
        type: String,
        default: null,
    },
    
    createdAt: {
        type: Number,
        default: new Date().getTime(),
    },
    updatedAt: {
        type: Number,
        default: new Date().getTime(),
    },
   
    is_blocked: {
        type: Number,
        default: 0,
    },
    access_token: {
        type: String,
        default:null
    },

}, {
    strict: true,
    collection: 'sub_admin',
    timestamps: true,
    versionKey: false
});

const SubAdminModel = mongoose.model('sub_admin', SubAdminSchema);
module.exports = { SubAdminModel }