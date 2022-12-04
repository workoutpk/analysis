const APP_ENV = require('../config/application.properties')
const bcrypt = require('bcryptjs');
const saltRounds = 11;
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
exports.encryptPassword = async(plaintext) => {
    let encryptedPass = await bcrypt.hash(plaintext, saltRounds);
    return encryptedPass;
}


exports.verifyPassword = async(plaintext, encryptText) => {
    let matched = await bcrypt.compare(plaintext, encryptText);
    return matched;
}

exports.generateToken = async() => {
    
    // let token = jwt.sign({ access: 'access-' }, config.JWT_PRIVATE_KEY, { expiresIn: '2 days' });
    let token = jwt.sign({ access: 'access-' }, APP_ENV.APP_ENV.JWT_PRIVATE_KEY, { });
    return token;
}
exports.generateExpireToken = async(data) => {
    
    // let token = jwt.sign({ access: 'access-' }, config.JWT_PRIVATE_KEY, { expiresIn: '2 days' });
    let token = jwt.sign(data, APP_ENV.APP_ENV.JWT_PRIVATE_KEY, { expiresIn: '1 days'});
    return token;
}

exports.generateOtp = async() => {
    let text = "";
    let possible = "123456789";

    for (var i = 0; i < 4; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

// exports.getLocation = async function(lati,long){
//     return res = await geocoder.reverse({ lat: lati, lon: long });
    
// }

exports.makeReffralCode = (length) =>{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}