const { mongoose, } = require('../services/mongoose');
let starSchema = new mongoose.Schema({
    galaxy_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'galaxy'
    },
    star_name: {
       type:String,
       default:0
    },
    star_id: {
        type:String,
        default:0
    },
    star_geometry: [{
        type:Number,
        default:0
    }],   
    star_location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [{
            type:Number,
            default:0
        }]
    },

}, {
    strict: true,
    collection: 'star',
    timestamps: true,
    versionKey: false
});

const StarModel = mongoose.model('star', starSchema);
module.exports = { StarModel }