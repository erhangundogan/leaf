var mongoose = require('mongoose'),
    config = require('../config'),
    connection = exports.connection = mongoose.createConnection(config.db.connection),
    schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * User Schema
 */
var UserSchema = exports.UserSchema = new schema({
  name: {type:String, index:true},
  email: {type:String, index:true},
  provider: String,
  hashed_password: String,
  salt: String,
  active: {type:Boolean, default:false},
  role: [String],
  createDate: {type:Date, "default":Date.now}
});


UserSchema.virtual('password').set(function (password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashed_password = this.encryptPassword(password);
})
.get(function() {
  return this._password;
});

UserSchema.statics.isAdmin = function(user, callback) {
  this.findOne()
      .where("email", user.email)
      .where("active", true)
      .exec(function(err, account) {
        if (err) {
          console.log("[ERROR] isAdmin, %s", err);
          callback(err);
        } else {
          if (account && account._doc && account._doc.role) {
            var hasAdminRole = !!(account._doc.role.indexOf("admin") >= 0);
            callback(null, hasAdminRole);
          } else {
            callback();
          }
        }
      });
};

UserSchema.statics.createUser = function(user, callback) {
  user.provider = "local";
  user.role = ["member"];
  this.create(user, callback);
};

var validatePresenceOf = function (value) {
  return value && value.length;
};

UserSchema.path('name').validate(function (name) {
  return name.length;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function (email) {
  return email.length;
}, 'Email cannot be blank');

UserSchema.path('hashed_password').validate(function (hashed_password) {
  return hashed_password.length;
}, 'Password cannot be blank');


UserSchema.pre('save', function (next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password))
    next(new Error('Invalid password'));
  else
    next();
});


UserSchema.methods = {

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  encryptPassword: function (password) {
    if (!password) return '';
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  }
};

var UserModel = exports.UserModel = connection.model('user', UserSchema);