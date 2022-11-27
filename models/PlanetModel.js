const { mongoose, } = require('../services/mongoose');
let planetSchema = new mongoose.Schema({
    solar_system: {
        type: mongoose.Schema.ObjectId,
        ref: 'star'
    },
    callingOn: {
       type:String,
       default:0
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    typeOfCalling: {
        type:Number,
        default:0
    },   // 1:Audio call, 2: Video call 3: chat
    duration: {
        type:String,
        default:0
    },
    
}, {
    strict: true,
    collection: 'planet',
    timestamps: true,
    versionKey: false
});

const PlanetModel = mongoose.model('planet', planetSchema);
module.exports = { PlanetModel }