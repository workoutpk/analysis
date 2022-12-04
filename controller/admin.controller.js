const { AdminModel }= require("../models/admin.model")
const Joi = require('joi');
const HttpStatus = require('../module/status.module')
const GenerateName = require('../module/generate.module')
const Realm = require("realm");
const { UUID } = Realm.BSON;
const utils = require('../helper/utils');
exports.adminAdd = async(req,res)=>{
    try {
        
        const schema = Joi.object().keys({
            email:  Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'org'] } }).allow(null,""),        
              
            device_type:  Joi.string().required(),              
            country_code:  Joi.string().optional().allow('').min(2).max(3),          
            mobile_number: Joi.string().when('email', { is: Joi.any().valid(null, ""), then: Joi.required(), otherwise:Joi.optional().allow(null, "")}).min(6),           
            country_code: Joi.number().when('mobile_number', { is: Joi.any().valid(null, ""), then: Joi.optional().allow(null, ""), otherwise:Joi.required()}), 
                    
                    
        })
        
        let da = await schema.validateAsync(req.body);
        let data = req.body;
     
        let otp = await utils.generateOtp();
   
        let dt = new Date().getTime()+ 10 * 60 * 1000;
        
        let adminObj = {
            email:data.email,
            device_type:data.device_type,
            mobile_number:data.mobile_number,
            country_code:data.country_code,
            otp_info:otp,
            exp_time:dt,          
        }
        let access_token = await utils.generateExpireToken(adminObj)
        // console.log("access_token ..." +access_token)
        adminObj["access_token"] = access_token
        // req.files.forEach(file => {
        //     adminObj[file.fieldname] = `/admin/${file.filename}`;
        // })
        // let createadmin = new AdminModel(adminObj)
        // createadmin =  await createadmin.save()
        // console.log(adminObj)
        res.status(HttpStatus.CREATED).json({ data: adminObj, message: 'success!' });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}

exports.adminAll = async(req,res)=>{
    try {
    
        let adminList =  await AdminModel.find()
        
        res.status(HttpStatus.SUCCESS_STATUS).json({ data: adminList, message: 'success!' });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}
exports.adminVerifyOtp = async(req,res)=>{
    try {
        const schema = Joi.object().keys({
            otp_code:  Joi.number().required(),         
        })
                
        let da = await schema.validateAsync(req.body);
        let data = req.adminData;
        let adminObj = req.adminData;
        let otpTime =  new Date().getTime()
        let createadmin = null;
        let dt = new Date().getTime();
        // console.log( JSON.stringify(adminObj))
        let tokenObj = {
            email:data.email,
            device_type:data.device_type,
            mobile_number:data.mobile_number,
            country_code:data.country_code,
        }
        
        let isOtp = await AdminModel.findOne({otp:req.body.otp_code})
        if(isOtp){
            if(isOtp.otp_info.exp_time > otpTime){
                createadmin = isOtp
            }
            else{
                throw new Error("OTP Expired !!")
            }
        }else{
            let access_token = await utils.generateToken()
  
            let adminSavedObj = {
                email:data.email,
                device_type:data.device_type,
                mobile_number:data.mobile_number,
                country_code:data.country_code,
                access_token:access_token,
                otp_info:{
                    otp:data.otp,
                    exp_time:dt,          
                },
            }
            if(adminObj.exp_time > otpTime){
                if(adminObj.otp_info === req.body.otp_code){
                    createadmin = new AdminModel(adminSavedObj)
                    createadmin =  await createadmin.save()
                }else{
                    throw new Error("Invalid OTP !!")
                }
            }else{
                throw new Error("OTP Expired !!")
            }
          
        }
       
        // let adminList =  await AdminModel.find()
        
        res.status(HttpStatus.SUCCESS_STATUS).json({ data: createadmin, message: 'success!' });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}

exports.adminSetPassword = async(req,res)=>{
    try {
        const schema = Joi.object().keys({
            password:  Joi.string().required().min(8),         
            password_re:  Joi.string().required().min(8),         
        })
        let data = req.body;                
        let da = await schema.validateAsync(req.body);
        let adminObj = req.adminData;
        let encPassword = await utils.encryptPassword(data.password)
        let updateObj = null
        if(data.password === data.password_re){
            updateObj = await AdminModel.findByIdAndUpdate(adminObj._id,{$set:{password:encPassword}},{new:true})
        }else{
            throw new Error("Both Password Should Be Same !!")
        }
        
        // let adminList =  await AdminModel.find()
        
        res.status(HttpStatus.ACCEPTED).json({ data: updateObj, message: 'success!' });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}
exports.adminLogin = async(req,res)=>{
    try {
        const schema = Joi.object().keys({
            email:  Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'org'] } }).required(),         
            password:  Joi.string().required().min(8),         
        })
        let data = req.body;
               
        let da = await schema.validateAsync(req.body);
        // console.log(adminObj)
        let isEmail =  await AdminModel.findOne({email:data.email})
        let updateObj = null
        if(!isEmail){
            throw new Error("Email Not Found !!")
        }else{
            let checkPass =  await utils.verifyPassword(data.password,isEmail.password)
            if(checkPass){
                let access_token = await utils.generateToken()
                updateObj = await AdminModel.findByIdAndUpdate(isEmail._id,{$set:{access_token:access_token}},{new:true})
            }else{
                throw new Error("Invalid Password !!")
            }
        }
        
        
        // let adminList =  await AdminModel.find()
        
        res.status(HttpStatus.SUCCESS_STATUS).json({ data: updateObj, message: 'success!' });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}