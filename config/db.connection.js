const mongoose = require('mongoose');
//  const conn = mongoose.connect("mongodb://127.0.0.1:27017/analysis")

 const conn = mongoose.connect('mongodb://pk_Usr:pk_Ass0505@127.0.0.1:27017/pk_db', { useNewUrlParser: true, useUnifiedTopology: true, }); //for server
  


 exports.mongoose = mongoose;

 exports.conn = conn;