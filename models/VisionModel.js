const { mongoose, } = require('../services/mongoose');
let  visionSchema = new mongoose.Schema({
    planet_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'planet'
    },
    vision_article: {
        type:String,
        default:false
    },

    vision_name: {
        type:String,
        default:false
    }, 
     
    vision_type: {
        type: String,
        enum : ['LIVING','NONLIVING']
    },

    
    vision_sources:[{
        type:String,
        default:false
    }],      
    
    

    
}, {
    strict: true,
    collection: 'vision',
    timestamps: true,
    versionKey: false
});

const  VisionModel = mongoose.model('vision',  visionSchema);
module.exports = {  VisionModel }