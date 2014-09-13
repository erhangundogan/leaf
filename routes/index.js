/**
 * Routes index.js
 */

var product = require('../schema/production').ProductionModel;
var consume = require('../schema/consumption').ConsumptionModel;
var helper = require('../helper');

exports.home = function(req, res) {
  res.sendfile('./public/index.html');
};

exports.consume = {
  save: function(req, res) {
    res.end();
  }
};

exports.product = {
  getByCode: function(req, res) {
    var code = req.params.code;
    product.findOne({ code:code }).exec(function(err, result) {
      if (err) {
        res.json({ error: err });
      } else if (result && result._doc) {
        res.json({ data: result._doc});
      } else {
        res.json({ data: null });
      }
    });
  },
  getOneByFilter: function(req, res) {
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
  getManyByFilter: function(req, res) {
    var params = req.query;
    product
      .find(params)
      .lean(true)
      .exec(function(err, result) {
        if (err) {
          res.json({ error: err });
        } else if (result && result.length > 0) {
          res.json({
            data: result,
            count: result.length
          });
        } else {
          res.json({ data: null });
        }
      });
  },
  save: function(req, res) {
    res.end();
  }
};