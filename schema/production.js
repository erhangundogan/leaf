var mongoose = require('mongoose'),
    connection = require('./user').connection,
    schema = mongoose.Schema,
    ObjectId = schema.ObjectId;

/**
 * Production Schema
 */
var ProductionSchema = exports.ProductionSchema = new schema({
  name: { type:String, index:true },
  brand: { type:String, index:true },
  company: { type:String },
  image: { type:String },
  code: { type:String, index:true },
  description: { type:String },
  tags: [String],
  type: { type:String, default:'drink', index:true },
  longitude: Number,
  latitude: Number,
  country: String,
  city: String,
  district: String,
  valid: { type:Boolean, default:true },
  recordDate: { type:Date, "default":Date.now },
  recordedBy: { type:ObjectId, index:true, ref:'user' }
});

exports.ProductionModel = connection.model('production', ProductionSchema);