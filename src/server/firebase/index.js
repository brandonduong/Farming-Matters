const { initializeApp } = require('firebase/app');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_SENDERID,
  appId: process.env.FIREBASE_APPID
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = firebaseApp.auth();

module.exports = { firebaseApp, auth }