module.exports = {
  app: {
    name: 'leaf'
  },
  db: {
    connection: 'mongodb://192.168.122.10/leaf',
    cookieSecret: 'leafteam rocks!'
  },
  web: {
    port: 3000,
    sessionDuration: new Date(Date.now() + 3600000),
    secret: 'leaf rocks'
  }
};
