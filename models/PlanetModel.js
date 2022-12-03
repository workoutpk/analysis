const { mongoose, } = require('../services/mongoose');
let planetSchema = new mongoose.Schema({
    solar_system: {
        type: mongoose.Schema.ObjectId,
        ref: 'star'
    },
    planet_name: {
       type:String,
       default:null
    },
    planet_geometry: [{
        type:Number,
        default:0
    }],   
    planet_location: {
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
    collection: 'planet',
    timestamps: true,
    versionKey: false
});

const PlanetModel = mongoose.model('planet', planetSchema);
module.exports = { PlanetModel }