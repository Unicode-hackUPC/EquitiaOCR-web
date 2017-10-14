var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
require("firebase/storage");

export const initializeFirebase = () => {
  const config = {
    apiKey: "AIzaSyCQ_RWnv2IxhzOPj8KfQAW-WNxaKpBkdh4",
    authDomain: "equitiaocr.firebaseapp.com",
    databaseURL: "https://equitiaocr.firebaseio.com",
    projectId: "equitiaocr",
    storageBucket: "equitiaocr.appspot.com",
    messagingSenderId: "91868631822"
  };

  firebase.initializeApp(config);
  console.log("done");
};

const makeid = () => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

console.log(makeid());
export const uploadImage = (file, callback) => {
  // Create a root reference
  console.log("file", file);
  const store = firebase.storage();
  const ref = store.ref();
  ref
    .child("images/" + makeid())
    .put(file)
    .then(function(snapshot) {
      callback(snapshot.downloadURL);
    })
    .catch(err => {
      console.log("err", err);
    });
};
