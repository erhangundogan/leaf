/**
 * Routes index.js
 */

var product = require('../schema/production').ProductionModel,
    consumption = require('../schema/consumption').ConsumptionModel,
    helper = require('../helper');

exports.home = function(req, res) {
  res.sendfile('./public/index.html');
};

/**
 * record consumer data and return distance with newly created item
 * @param data
 * @param callback
 */
var recordConsumption = function(data, callback) {
  if (data &&
      data.product &&
      data.product.longitude &&
      data.product.latitude &&
      data.longitude &&
      data.latitude) {

    var distance = helper.distance(
      data.product.latitude,
      data.product.longitude,
      data.latitude,
      data.longitude,
      'K');

    if (distance > 0) {
      consumption.create({
        longitude: data.longitude,
        latitude: data.latitude,
        distance: distance,
        production: data.product._id
      }, callback);

    } else {
      callback('location could not be calculated');
    }

  } else {
    callback('location could not be calculated');
  }
};

/**
 * calculate rating with simple distance criteria
 * another formula would be getting maximum distance and calculating with it
 * @param product
 * @param callback
 */
var calculateRating = function(consumption, callback) {
  if (consumption.distance >= 2000) {
    callback(null, 1); // distant
  } else {
    var result = consumption.distance / 2000;
    callback(null, result);
  }
};

/**
 * product requests
 * @type {{getByCode: getByCode, getOneByFilter: getOneByFilter, getManyByFilter: getManyByFilter, save: save}}
 */
exports.product = {
  search: function(req, res) {
    var name = req.query && req.query.name ? req.query.name : null;

    if (name) {
      var nameSearch = new RegExp(name, 'i');

      product
        .find()
        .where('name')
        .regex(nameSearch)
        .lean(true)
        .exec(function(err, result) {
          if (err) {
            console.error('[ERROR] product.search, %s', err);
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
    }
  },
  getByCode: function(req, res) {
    var code = req.params.code;
    var longitude = req.query && req.query.lon ? req.query.lon : null;
    var latitude = req.query && req.query.lat ? req.query.lat : null;

    product.findOne({ code:code }).exec(function(err, result) {
      if (err) {
        console.error('[ERROR] product.findOne, %s', err);
        res.json({ error: err });
      } else if (result && result._doc) {
        // we have this product in our database
        var product = result._doc;

        if (longitude && latitude) {
          // it is consumer and sending data
          recordConsumption({
            product: product,
            longitude: longitude,
            latitude: latitude
          }, function(err, consumptionItem) {
            if (err) {
              // we could not save consumption error returning
              console.error('[ERROR] recordConsumption, %s', err);
              product.impact = 0;
              res.json({ data: product, error:err });
            } else {

              if (consumptionItem && consumptionItem._doc) {
                // we captured consumption now return rating to client
                calculateRating(consumptionItem._doc, function(err, result) {
                  if (err) {
                    // we could not calculate rating returning error
                    console.error('[ERROR] calculateRating, %s', err);
                    product.impact = 0;
                    res.json({ data: product, error:err });
                  } else {
                    // we are done, return product with impact
                    // bigger value means far from production
                    // and worse for environment
                    product.impact = result;
                    product.distance = consumptionItem._doc.distance;
                    res.json({
                      data: product
                    });
                  }
                });
              } else {
                product.impact = 0;
                res.json({ data: product });
              }
            }
          });
        } else {
          product.impact = 0;
          res.json({ data: product });
        }

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
    if (req.body && req.body.code) {
      product.create({
        name: req.body.name,
        brand: req.body.brand,
        company: req.body.company,
        image: req.body.image,
        code: req.body.code,
        description: req.body.description,
        tags: req.body.tags,
        longitude: req.body.longitude,
        latitude: req.body.latitude
      }, function(err, result) {
        if (err) {
          res.json({
            error: err
          })
        } else if (result && result._doc) {
          res.json({
            data: result._doc
          });
        } else {
          res.json({
            data: null
          });
        }
      });
    } else {
      res.json({
        error: 'There is no product information'
      });
    }
  }
};