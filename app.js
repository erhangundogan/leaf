
/**
 * Node.js rocks
 */

var express            = require('express'),
    http               = require('http'),
    routes             = require('./routes'),
    config             = require('./config'),
    app                = express(),
    server             = module.exports = http.createServer(app),
    passport           = require("./passports").Passport,
    dbConfig           = config.db.options,
    MongoDb            = require("mongoose/node_modules/mongodb"),
    mongoStore         = require("connect-mongo")(express),
    MongoDbServer      = new MongoDb.Server(dbConfig.host, dbConfig.port, dbConfig.serverOptions),
    MongoDbConnection  = new MongoDb.Db(dbConfig.dbName, MongoDbServer, dbConfig.dbOptions),
    sessionStore       = new mongoStore({ db: MongoDbConnection, collection: dbConfig.collection }),
    cookieParser       = express.cookieParser();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger());
  app.use(express.bodyParser({ uploadDir:"/tmp" }));
  app.use(express.methodOverride());
  app.use(cookieParser);
  app.use("/public", express.static(__dirname + "/public"));
  app.use(express.session({
    secret: config.web.secret,
    store: sessionStore,
    cookie: {
      expires: config.web.sessionDuration,
      maxAge: config.web.sessionDuration
    }
  }));

  //use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  //dynamic helpers
  app.use(function(req, res, next) {
    res.locals.user = req.user;
    res.locals.session = req.session;
    next();
  });

  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('*', routes.home);

server.listen(config.web.port, function() {
  console.log("leaf api server listening on port %d in %s mode", config.web.port, app.settings.env);
});