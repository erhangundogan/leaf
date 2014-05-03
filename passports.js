var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./schema/user').UserModel,
    app = require("./app");


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(
  function(user, done) {
    done(null, user);
  }
);

LocalStrategy.prototype.authenticate = function(req) {
  if (!req.body || !(req.body.user && req.body.user.email && req.body.user.password)) {
    return this.fail();
  }

  var username = req.body.user.email,
    password = req.body.user.password,
    self = this;

  this._verify(username, password, function(err, user) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(); }
    self.success(user);
  });
};

passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {
      User.findOne()
        .where("email", username)
        .where("active", true)
        .exec(function(err, account) {
          if (err) {
            console.log("[ERROR] passport.local verify, %s", err);
            return done(err);
          } else {
            if (account && account._doc) {
              return done(null, account.authenticate(password) ? account._doc : false);
            } else {
              return done(null, false);
            }
          }
        });
    });
  }
));

exports.Passport          = passport;
exports.LocalStrategy     = LocalStrategy;