module.exports = {
  app: {
    name: 'leaf'
  },
  db: {
    connection: 'mongodb://guest:iamguestok@ds063889.mongolab.com:63889/leaf',
    cookieSecret: 'leafteam rocks!'
  },
  web: {
    port: 3000,
    sessionDuration: new Date(Date.now() + 3600000),
    secret: 'leaf rocks'
  }
};
