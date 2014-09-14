module.exports = {
  app: {
    name: 'leaf'
  },
  db: {
    connection: 'mongodb://localhost/leaf',
    //connection: 'mongodb://192.168.122.10/leaf',
    cookieSecret: 'leafteam rocks!'
  },
  web: {
    port: 8005,
    sessionDuration: new Date(Date.now() + 3600000),
    secret: 'leaf rocks'
  }
};
