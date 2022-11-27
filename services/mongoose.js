const mongoose = require('mongoose');
 const conn = mongoose.connect("mongodb://127.0.0.1:27017/analysis")

//  const conn = mongoose.connect('mongodb://seeway-app:seewayapp@127.0.0.1:27017/Seeway-App', { useNewUrlParser: true, useUnifiedTopology: true, }); //for server
  // const conn = mongoose.connect('mongodb://seeway-app:seewayapp@18.133.218.168:27017/Seeway-App', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }); // for local



 exports.mongoose = mongoose;

 exports.conn = conn;