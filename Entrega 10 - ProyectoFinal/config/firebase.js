const admin = require("firebase-admin");

const serviceAccount = require("./coderhouse-firebase.json");

const connectFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};

module.exports = connectFirebase;
