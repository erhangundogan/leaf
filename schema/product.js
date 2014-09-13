var mongoose = require('mongoose'),
    connection = require('./user').connection,
    schema = mongoose.Schema,
    ObjectId = schema.ObjectId;

/**
 * Product Schema
 */
var ProductSchema = exports.ProductSchema = new schema({
  name: { type:String },
  brand: { type:String },
  company: { type:String },
  image: { type:String },
  barcode: { type:String },
  impact: Number,
  description: { type:String },
  tags: [String],
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

exports.ProductModel = connection.model('product', ProductSchema);