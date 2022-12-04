const { GalaxyModel }= require("../models/galaxy.model")
const Joi = require('joi');
const HttpStatus = require('../module/status.module')
const GenerateName = require('../module/generate.module')

exports.galaxyAdd = async(req,res)=>{
    try {
        
        // const schema = Joi.object().keys({
        //     galaxyName: Joi.string().required(),
        //     coordinates: Joi.string().required(),
        //     galxay_geometry: Joi.string().required(),
          
        // })
        
        // let da = await schema.validateAsync(req.body);
        let galaxyName = GenerateName.galaxyName();
        let galaxyObj = {
            galxay_name:galaxyName
        }
        let createGalaxy = new GalaxyModel(galaxyObj)
        createGalaxy =  await createGalaxy.save()
        
        res.status(HttpStatus.CREATED).json({ data: createGalaxy, message: 'success!' });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}
exports.galaxyAll = async(req,res)=>{
    try {
    
        let galaxyList =  await GalaxyModel.find()
        
        res.status(HttpStatus.SUCCESS_STATUS).json({ data: galaxyList, message: 'success!' });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}