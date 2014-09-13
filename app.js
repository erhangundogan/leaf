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
    routes            = require("./routes"),
    settings          = require("./settings"),
    dbConfig          = settings.db.session,
    MongoDb           = require("mongoose/node_modules/mongodb"),
    MongoDbServer     = new MongoDb.Server(dbConfig.host, dbConfig.port, dbConfig.serverOptions),
    MongoDbConnection = new MongoDb.Db(dbConfig.dbName, MongoDbServer, dbConfig.dbOptions);
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
app.use(express.session({secret: 'white_rabbit'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', routes.home);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = app.listen(app.get('port'), function() {
  console.log('Gear application listening on port ', server.address().port);
});

module.exports = app;