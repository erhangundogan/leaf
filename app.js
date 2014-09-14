/**
 *
 * Leaf api and web server
 */

var express           = require('express'),
    path              = require('path'),
    favicon           = require('serve-favicon'),
    logger            = require('morgan'),
    cookieParser      = require('cookie-parser'),
    bodyParser        = require('body-parser'),
    session           = require('express-session'),
    MongoStore        = require('connect-mongo')(session),
    routes            = require('./routes'),
    settings          = require('./config'),
    passports         = require('./auth'),
    app               = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.set('port', settings.web.port);
app.set('views', path.join(__dirname, 'public/templates'));
app.set('view engine', 'jade');

// Add headers
app.use(function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// log
app.use(logger('dev'));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse cookies
app.use(cookieParser());

// set static directory
app.use(express.static(path.join(__dirname, 'public')));

// mongodb session storage
app.use(session({
  secret: settings.db.cookieSecret,
  store: new MongoStore({
    auto_reconnect: true,
    url : settings.db.connection + '/sessions'
  })
}));

// routes begin here
app.get  ('/api/product/:code', routes.product.getByCode);
app.get  ('/api/product', routes.product.getOneByFilter);
app.get  ('/api/products', routes.product.getManyByFilter);
app.get  ('/api/search', routes.product.search);
app.post ('/api/product', routes.product.save);
app.use  ('*', routes.home);
// routes end here

var server = app.listen(app.get('port'), function() {
  console.log('leaf api server listening on port', server.address().port);
});

module.exports = app;