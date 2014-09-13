/**
 * Routes index.js
 */

exports.home = function(req, res) {
  res.sendfile('./public/index.html');
};

exports.product = {
  get: function(req, res) {
    debugger;
  }
};