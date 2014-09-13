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
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'public/templates'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.cookieParser());
app.use(session({
  secret: settings.db.cookieSecret,
  store: new MongoStore({
    auto_reconnect: true,
    url : settings.db.connection + '/sessions'
  })
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/product', routes.product.get);
app.use('*', routes.home);

var server = app.listen(app.get('port'), function() {
  console.log('leaf api server listening on port ', server.address().port);
});

module.exports = app;