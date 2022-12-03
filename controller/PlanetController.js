const { PlanetModel }= require("../models/PlanetModel")
const Joi = require('joi');
const HttpStatus = require('../module/StatusModule')
const GenerateName = require('../module/GenerateModule')
const Realm = require("realm");
const { UUID } = Realm.BSON;
exports.planetAdd = async(req,res)=>{
    try {
        
        const schema = Joi.object().keys({
            solar_system: Joi.string().required(),        
            planet_name: Joi.string().required(),        
        })
        
        let da = await schema.validateAsync(req.body);
        let data = req.body;
       
        let planetObj = {
            solar_system:data.solar_system,
            planet_name:data.planet_name.toUpperCase(),
     
        }
        let createplanet = new PlanetModel(planetObj)
        createplanet =  await createplanet.save()
        
        res.status(HttpStatus.CREATED).json({ data: createplanet, message: 'success!' });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}
exports.planetAll = async(req,res)=>{
    try {
    
        let planetList =  await PlanetModel.find()
        
        res.status(HttpStatus.SUCCESS_STATUS).json({ data: planetList, message: 'success!' });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}