const { mongoose, } = require('../config/db.connection');
let  publishSchema = new mongoose.Schema({
    planet_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'planet'
    },
    vision_id: {
        type:String,
        default:false
    },
    
    publish_name: {
        type:String,
        default:false
    }, 
    publish_body: {
        type:String,
        default:false
    }, 
    publish_type: {
        type: String,
        enum : ['SURVEY','OBSERVATION','ANALYSIS'], // AN-ALL,OBG- SOME AREA/PORTION, SURVEY-ASSUMPTION/OPINION
    },

    publish_text: [
        {
            publish_title:{
                type:String,
                default:false
            },
            publish_description:{
                type:String,
                default:false
            },
            publish_media:{
                type:String,
                default:false
            },
            publish_url:{
                type:String,
                default:false
            }
        }
    ],
    publish_sources:[{
        type:String,
        default:false
    }],      
    
    publish_data_type: {
        type: {
            type: Number,
            default: 1
        },        
    },

    
}, {
    strict: true,
    collection: 'publish',
    timestamps: true,
    versionKey: false
});

const  PublishModel = mongoose.model(' publish',  publishSchema);
module.exports = { PublishModel }