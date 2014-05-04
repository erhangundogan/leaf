var mongoose = require('mongoose'),
    connection = require('./user').connection,
    schema = mongoose.Schema,
    ObjectId = schema.ObjectId;

/**
 * UserMessage Schema
 */
var UserMessageSchema = exports.UserMessageSchema = new schema({
  text: String,
  createdBy: { type:ObjectId, index:true, ref:'user' },
  createDate: { type:Date, index:true, "default":Date.now },
  hashtags: [String]
});

UserMessageSchema.statics.createMessage = function(message, callback) {
  if (message.text) {
    message.hashtags = message.text.match(/(?!\s+)(#\S+)/g);
  }
  this.create(message, callback);
};

UserMessageSchema.statics.getRecentMessages = function(page, user, callback) {

  if (typeof(page) == 'function') {
    callback = page;
    page = 0;
    user = null;
  }
  page = page || 0;

  if (user) {
    this.find({ createdBy:user })
      .lean()
      .sort('-createDate')
      .skip(page * 10)
      .limit(10)
      .populate('createdBy')
      .exec(callback);
  } else {
    this.find()
      .lean()
      .sort('-createDate')
      .skip(page * 10)
      .limit(10)
      .populate('createdBy')
      .exec(callback);
  }

};

var UserMessageModel = exports.UserMessageModel = connection.model('userMessage', UserMessageSchema);