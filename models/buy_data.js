'use strict';
var mongoose = require('../models/db');
//request schema
var buyDataSchema = mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  network:{
    type:String,
    required:true
  },
  bundle:{
    type:String,
    required:true
  },
  phone_number:{
    type:String,
    required:true
  },
  amount:{
    type:Number,
    required:true
  },
  request_date:{
        type:Date,
        required:true,
        default:new Date()
  },
  done_date:{
        type:Date
  },
  done:{
    type:String,
    enum:["No","Yes"],
    default:'No',
    required:true
  }
});
var BuyDataRequest = module.exports = mongoose.model('BuyDataRequest',buyDataSchema);
module.exports.createBuyDataRequest = function(request,callback){
  request.save(callback);
};
module.exports.getAllBuyDataRequest = function(query,callback){
  BuyDataRequest.find(query,callback);
};
module.exports.updateABuyDataRequest = function(id,done,callback){
  var done_date = null;
  if(done =="Yes"){
    done_date = new Date();
  }
  BuyDataRequest.findOneAndUpdate({_id:id},{$set:{done:done,done_date:done_date}},callback);
};
module.exports.getCount =function(callback){
  BuyDataRequest.count({done:"No"},callback);
};