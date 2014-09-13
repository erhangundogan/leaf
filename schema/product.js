var mongoose = require('mongoose'),
  connection = require('./user'),
  schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = exports.ProductSchema = new schema({
  name: { type:String },
  brand: { type:String },
  image: { type:String },
  barcode: { type:String },
  impact: Number,
  consumed: {
    longitude:Number,
    latitude:Number,
    country:String,
    city:String,
    district:String
  },
  produced: {
    longitude:Number,
    latitude:Number,
    country:String,
    city:String,
    district:String
  },
  active: { type:Boolean, default:true },
  recordDate: { type:Date, "default":Date.now },
  recordedBy: { type:ObjectId, index:true, ref:'user' }
});

var ProductModel = exports.ProductModel = connection.model('product', ProductSchema);