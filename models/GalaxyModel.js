const { mongoose, } = require('../services/mongoose');
let galaxySchema = new mongoose.Schema({
    // galxy_system: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'galaxy_system'
    // },
    galxay_name: {
       type:String,
       default:null
    },
    galxay_system_id: {
        type: mongoose.Schema.ObjectId,
        uniqe: true,
        default:null
    },
    galxay_geometry: {
        type:[Number],
        default:0
    }, 
    galxay_birth: {
        type:String,
        default:0
    },
    galxay_dies: {
        type: Number, 
        default: 0 , 
    },     
    
    galxay_location: {
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
    collection: 'galaxy',
    timestamps: true,
    versionKey: false
});
galaxySchema.index({ location: '2dsphere' })
const GalaxyModel = mongoose.model('galaxy', galaxySchema);
module.exports = { GalaxyModel }