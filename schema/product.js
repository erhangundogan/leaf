var mongoose = require('mongoose'),
  connection = require('./user'),
  schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = exports.ProductSchema = new schema({
  name: { type:String },
  brand: { type:String },
  soldAt: { longitude:Number, latitude:Number },
  producedCity: { type:String },
  producedCountry: { type:String },
  active: { type:Boolean, default:true },
  createDate: { type:Date, "default":Date.now },
  createdBy: { type:ObjectId, index:true, ref:'user' }
});

var ProductModel = exports.ProductModel = connection.model('product', ProductSchema);