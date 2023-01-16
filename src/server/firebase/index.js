var admin = require("firebase-admin");
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require("firebase-admin/auth");

var serviceAccount = require("../secrets/firebaseServiceAccount.json");

initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = getAuth();

module.exports = { auth }