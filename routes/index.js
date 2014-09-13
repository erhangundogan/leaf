/**
 * Routes index.js
 */

exports.home = function(req, res) {

  res.sendfile('./public/index.html', { root: __dirname + '/..' } );
};
