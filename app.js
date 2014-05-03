
/**
 * Node.js rocks
 */

var express = require('express'),
    routes = require('./routes'),
    config = require('./config'),
    app = module.exports = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: config.application.secret }));
  app.use(app.router);
  app.use('/public', express.static(__dirname + '/public'));
  app.use(function(req, res, next) {
    res.locals.user = req.user;
    res.locals.authenticated = ! req.user.anonymous;
    res.locals.session = req.session;
    next();
  });
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(config.web.port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
