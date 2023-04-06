/**
 * Initializes Firebase using the 'serviceAccount' secret and exports the auth instance
 * used to interact with Firebase auth.
 * See https://firebase.google.com/docs/auth/admin
 */

var admin = require("firebase-admin");
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require("firebase-admin/auth");

var serviceAccount = require("../secrets/firebaseServiceAccount.json");

initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = getAuth();

module.exports = { auth }