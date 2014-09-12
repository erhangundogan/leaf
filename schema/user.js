var mongoose = require('mongoose'),
    config = require('../config'),
    connection = exports.connection = mongoose.createConnection(config.db.connection),
    schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = exports.UserSchema = new schema({
  name: { type:String },
  fullName: { type:String, index:true },
  email: { type:String, index:true },
  provider: String,
  hashed_password: String,
  salt: String,
  active: { type:Boolean, default:true },
  createDate: { type:Date, "default":Date.now },
  info: String,
  city: String,
  country: String
});

var UserModel = exports.UserModel = connection.model('user', UserSchema);