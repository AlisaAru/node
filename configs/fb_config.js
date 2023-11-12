
var admin = require("firebase-admin");
var serviceAccount = require("../service.json");
const { initializeApp } = require('firebase/app')
const fauth = require('firebase/auth')

const firebaseConfig = {
    apiKey: "AIzaSyA5EDBvb94oQrgoo7e3IkgRqPYx9zcY8Uo",
    authDomain: "notes-54bcf.firebaseapp.com",
    projectId: "notes-54bcf",
    storageBucket: "notes-54bcf.appspot.com",
    messagingSenderId: "56908632749",
    appId: "1:56908632749:web:04421cec8f06011fc06c24",
    measurementId: "G-CESQNVEMYJ"
};


const app = initializeApp(firebaseConfig);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const fdb = admin.firestore()

console.log('Database is configured')
module.exports = {fdb,fauth};

