const { VisionModel }= require("../models/vision.model")
const Joi = require('joi');
const HttpStatus = require('../module/status.module')
const GenerateName = require('../module/generate.module')
const Realm = require("realm");
const { UUID } = Realm.BSON;
exports.visionAdd = async(req,res)=>{
    try {
        
        const schema = Joi.object().keys({
            planet_id:  Joi.string().required(),        
            vision_article:  Joi.string().required(),        
            vision_name:  Joi.string().required(),        
            vision_type:  Joi.string().required(),        
        })
        
        let da = await schema.validateAsync(req.body);
        let data = req.body;
      
        let visionObj = {
            planet_id:data.planet_id,
            vision_article:data.vision_article,
            vision_name:data.vision_name.toUpperCase(),
            vision_type:data.vision_type
        }
        let createvision = new VisionModel(visionObj)
        createvision =  await createvision.save()
        
        res.status(HttpStatus.CREATED).json({ data: createvision, message: 'success!' });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}
exports.visionAll = async(req,res)=>{
    try {
    
        let visionList =  await VisionModel.find()
        
        res.status(HttpStatus.SUCCESS_STATUS).json({ data: visionList, message: 'success!' });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}