var config = {};

config.mongodb = {};
config.web = {};
config.application = {};

config.mongodb.uri = 'http://localhost/mwitter';
config.mongodb.collection = 'mwitter';

config.web.port = 3000;
config.web.secret = 'catch me if you can...';

config.application.idLength = 14;

module.exports = config;