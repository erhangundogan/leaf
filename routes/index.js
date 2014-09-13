/**
 * Routes index.js
 */

var product = require('../schema/product').ProductModel;

exports.home = function(req, res) {
  res.sendfile('./public/index.html');
};

exports.product = {
  get: function(req, res) {
    var params = req.query;
    product.findOne(params).exec(function(err, result) {
      if (err) {
        res.json({ error: err });
      } else if (result && result._doc) {
        res.json({ data: result._doc});
      } else {
        res.json({ data: null });
      }
    });
  },
  create: function(req, res) {
    res.end();
  }
};