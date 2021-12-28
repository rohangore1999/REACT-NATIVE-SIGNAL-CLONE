import * as firebase from "firebase";
import "firebase/firestore"
import "firebase/auth"

// ref link ~ https://docs.expo.dev/guides/using-firebase/

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBN4WtJsUnXqyjrQ5dKD_4VUhWvcYtRIjM",
    authDomain: "signal-clone-reactnative-5b9d2.firebaseapp.com",
    projectId: "signal-clone-reactnative-5b9d2",
    storageBucket: "signal-clone-reactnative-5b9d2.appspot.com",
    messagingSenderId: "940086153089",
    appId: "1:940086153089:web:318effb40364093ce4e280",
    measurementId: "G-JCCFGG44WW"
  };

let app;

if (firebase.apps.length === 0){
    // means app is not yet define
    app = firebase.initializeApp(firebaseConfig)
} else {
    // else just update the app
    app = firebase.app()
}

// database access variable
const db = app.firestore();

// firebase authentication variable
const auth = firebase.auth();

export {db, auth};