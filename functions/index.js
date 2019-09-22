var functions = require('firebase-functions');
var admin = require('firebase-admin');
var tf = require('@tensorflow/tfjs-node');
var cors = require('cors')({origin : true});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://miniproject-ef989.firebaseio.com",
});

exports.getAll = functions.https.onRequest((request, response) => {
    cors(request,response, () => {   
        var array = []
        admin.database().ref('TestData').once('value' , datas => {
            datas.forEach(data => {
                array.push(data)
            })
            response.send(JSON.stringify(array))
        })
    })
});

