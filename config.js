module.exports = {
  app: {
    name: 'leaf'
  },
  db: {
    connection: 'mongodb://localhost/leaf',
    session: {
      host: "localhost",
      port: 27017,
      dbName: "leaf",
      collection: "sessions",
      serverOptions: { auto_reconnect: true, native_parser:true },
      dbOptions: {}
    }
  },
  web: {
    port: 3000,
    sessionDuration: new Date(Date.now() + 3600000),
    secret: 'leaf rocks'
  }
};
