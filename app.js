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

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: settings.db.cookieSecret,
  store: new MongoStore({
    auto_reconnect: true,
    url : settings.db.connection + '/sessions'
  })
}));

app.get  ('/api/product/:code', routes.product.getByCode);
app.get  ('/api/product', routes.product.getOneByFilter);
app.get  ('/api/products', routes.product.getManyByFilter);
app.post ('/api/product', routes.product.save);
app.post ('/api/consume', routes.consume.save);
app.use  ('*', routes.home);

var server = app.listen(app.get('port'), function() {
  console.log('leaf api server listening on port', server.address().port);
});

module.exports = app;