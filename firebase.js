import * as firebase from "firebase";
import "firebase/firestore"
import "firebase/auth"

// ref link ~ https://docs.expo.dev/guides/using-firebase/

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAWGMnmlpXgvx151DKALh2BJzYrpFlksqI",
    authDomain: "signal-clone-reactnative-52f5a.firebaseapp.com",
    projectId: "signal-clone-reactnative-52f5a",
    storageBucket: "signal-clone-reactnative-52f5a.appspot.com",
    messagingSenderId: "457360676864",
    appId: "1:457360676864:web:8e234d967875d286f3e0e5",
    measurementId: "G-MSGYPVP8LX"
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