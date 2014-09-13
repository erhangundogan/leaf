var mongoose = require('mongoose'),
  connection = require('./user').connection,
  schema = mongoose.Schema,
  ObjectId = schema.ObjectId;

/**
 * Consumption Schema
 */
var ConsumptionSchema = exports.ConsumptionSchema = new schema({
  longitude: Number,
  latitude: Number,
  country: String,
  city: String,
  district: String,
  distance: Number,
  quantity: { type:Number, default:1 },
  production: { type:ObjectId, index:true, ref:'production' },
  valid: { type:Boolean, default:true },
  recordDate: { type:Date, "default":Date.now },
  recordedBy: { type:ObjectId, index:true, ref:'user' }
});

exports.ConsumptionModel = connection.model('consumption', ConsumptionSchema);