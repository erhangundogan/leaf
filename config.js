var config = {};

config.db = {};
config.web = {};
config.app = {};

config.db.connection = 'mongodb://localhost/mwitter';
config.db.options = {
  host: "localhost",
  port: 27017,
  dbName: "mwitter",
  collection: "sessions",
  serverOptions: { auto_reconnect: true, native_parser:true },
  dbOptions: {}
};

config.web = {
  port: 3000,
  sessionDuration: new Date(Date.now() + 3600000),
  secret:'catch me if you can...'
};

config.app = {
  idLength: 14
};

module.exports = config;