var admin = require("firebase-admin");
var credential = require('../credential.json')
admin.initializeApp({
    credential: admin.credential.cert(credential),
  });
module.exports = admin;