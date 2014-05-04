var User = require('../schema/user').UserModel,
    UserMessage = require('../schema/userMessage').UserMessageModel,
    passport = require('../passports').Passport,
    path = require('path'),
    fs = require('fs'),
    jade = require('jade');

exports.index = function(req, res){
  res.render('content/recent');
};

exports.loadMessages = function(req, res) {
  if (req.xhr && req.params && req.params.id && req.params.page) {
    if (req.params.id == 'recent') {
      UserMessage.getRecentMessages(req.params.page, null, function(err, result) {
        if (err) {
          res.send(500, { error: err });
        } else {
          jade.renderFile(path.join(__dirname, '..', 'views', 'content', 'messages.jade'),
            { userMessages:result }, function(err, compiledResult) {
            if (err) {
              console.log(err);
              res.send(500, { error: err });
            } else {
              res.header('content-type', 'text/html');
              res.send(compiledResult, 200);
            }
          });
        }
      });
    } else {
      var fullName = encodeURIComponent(req.params.id);
      User.findOne({ fullName:fullName }, function(err, selectedUser) {
        if (err) {
          res.send(500, { error: err });
        } else if (selectedUser && selectedUser._doc) {
          UserMessage.getRecentMessages(req.params.page, selectedUser.id, function(err, result) {
            if (err) {
              res.send(500, { error: err });
            } else {
              jade.renderFile(path.join(__dirname, '..', 'views', 'content', 'messages.jade'),
                { userMessages:result }, function(err, compiledResult) {
                if (err) {
                  console.log(err);
                  res.send(500, { error: err });
                } else {
                  res.header('content-type', 'text/html');
                  res.send(compiledResult, 200);
                }
              });
            }
          });
        }
      });
    }
  }
};

exports.getUser = function(req, res, next) {
  if (req.params && req.params.id) {
    var fullName = encodeURIComponent(req.params.id);
    User.findOne({ fullName:fullName }, function(err, selectedUser) {
      if (err) {
        req.flash('danger', err);
        res.redirect('/');
      } else if (selectedUser && selectedUser._doc) {

        UserMessage.getRecentMessages(page, selectedUser.id, function(err, result) {
          if (err) {
            req.flash('danger', err);
          } else {
            res.render('content/user', { selectedUser:selectedUser._doc, userMessages:result });
          }
        });

      } else {
        req.flash('danger', escape(req.params.id) + ' not found');
        res.redirect('/');
      }
    });
  } else {
    var page = 0;
    if (req.params && req.params.page) {
      page = req.params.page;
    }

    UserMessage.getRecentMessages(page, null, function(err, result) {
       if (err) {
         req.flash('danger', err);
       } else {
         res.render('content/recent', { userMessages:result });
       }
    });
  }
};

exports.message = function(req, res) {
  res.render('content/newMessage');
};

exports.postMessage = function(req, res) {
  var userMessage = req.body.userMessage;
  if (userMessage && req.user) {
    var newMessage = new UserMessage();
    newMessage.createdBy = req.user._id;
    newMessage.text = userMessage.text.replace('\r\n', ' ').replace('\t', ' ').replace('\n', ' ');
    UserMessage.createMessage(newMessage, function(err, result) {
      if (err) {
        req.flash('danger', err);
      } else {
        req.flash('info', 'Your message created.');
        res.redirect('/' + req.user.fullName);
      }
    })
  }
};

exports.login = function(req, res) {
  res.render('auth/login');
};

exports.signup = function(req, res) {
  res.render('auth/signup');
};

exports.recent = function(req, res) {
  UserMessage.getRecentMessages(function(err, result) {
    if (err) {
      req.flash('danger', err);
    } else {
      res.render('content/recent', { userMessages:result });
    }
  });
};

exports.logout = function(req, res) {
  req.logout();
  if (req.session) {
    req.session.destroy(function(){});
  }
  res.redirect('/');
};

exports.hasLoggedIn = function(req, res, next) {
  if (req.user && req.isAuthenticated()) {
    req.flash('info', 'You already logged in.');
    var route = '/' + req.user.fullName;
    res.redirect(route);
  } else {
    next();
  }
};

exports.postLogin = function(req, res, next) {
  passport.authenticate("local", function(err, user) {
    if (err) {
      req.flash('danger', err);
      res.redirect("/login");
    } else {
      if (!user) {
        req.flash('danger', 'User not found or password entered wrong!');
        res.redirect("/login");
      } else {
        var route = "/" + user.fullName;
        var message = 'Login successful. Please wait redirecting.';

        req.logIn(user, function(err) {
          if (err) {
            req.flash('danger', err);
            res.redirect("/login");
          } else {
            res.redirect(route);
          }
        });
      }
    }
  })(req, res, next);
};


exports.postSignup = function(req, res) {
  if (!req.isAuthenticated()) {
    var postData = req.body.user;

    User.findOne({
      email: postData.email
    }, function (err, user) {
      if (err) {
        req.flash('danger', err);
        res.redirect("back");
      } else if (!user) {
        User.createUser(postData, function(err, newUser) {
          if (err) {
            req.flash('danger', err);
            res.redirect("back");
          } else {
            var route = "/" + postData.fullName;
            res.redirect(route);
          }
        });
      } else {
        res.redirect("back");
      }
    });
  } else {
    var route = "/home/" + postData.email;
    res.redirect(route);
  }
};

exports.requiresLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash("danger", 'User not logged in!');
    return res.redirect("/login");
  }
  next();
};
