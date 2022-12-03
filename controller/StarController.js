const { StarModel }= require("../models/StarModel")
const Joi = require('joi');
const HttpStatus = require('../module/StatusModule')
const GenerateName = require('../module/GenerateModule')
const Realm = require("realm");
const { UUID } = Realm.BSON;
exports.starAdd = async(req,res)=>{
    try {
        
        const schema = Joi.object().keys({
            galaxy_id: Joi.string().required(),        
        })
        
        let da = await schema.validateAsync(req.body);
        let data = req.body;
        let starName = GenerateName.starName();
        let starObj = {
            galaxy_id:data.galaxy_id,
            star_name:starName,
            star_id:new UUID()
        }
        let createstar = new StarModel(starObj)
        createstar =  await createstar.save()
        
        res.status(HttpStatus.CREATED).json({ data: createstar, message: 'success!' });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}
exports.starAll = async(req,res)=>{
    try {
    
        let starList =  await StarModel.find()
        
        res.status(HttpStatus.SUCCESS_STATUS).json({ data: starList, message: 'success!' });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}