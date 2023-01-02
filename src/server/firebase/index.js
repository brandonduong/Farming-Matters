var admin = require("firebase-admin");
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require("firebase-admin/auth");

var serviceAccount = require("../secrets/farming-matters-e8dee-firebase-adminsdk-m7oir-862d2d0f84.json");

initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = getAuth();

module.exports = { auth }