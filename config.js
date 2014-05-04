var config = {};

config.db = {};
config.web = {};
config.app = {};

config.db.connection = 'mongodb://192.168.122.10/mwitter';
config.db.options = {
  host: "192.168.122.10",
  port: 27017,
  dbName: "mwitter",
  collection: "sessions",
  serverOptions: { auto_reconnect: true, native_parser:true },
  dbOptions: {}
};

config.web = {
  port: 8002,
  sessionDuration: new Date(Date.now() + 3600000),
  secret:'catch me if you can... ye ye ye...'
};

config.app = {
  idLength: 14
};

module.exports = config;