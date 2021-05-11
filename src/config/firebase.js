import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebase_config = {
  apiKey: "AIzaSyDwtDg2dMJu6PKePUGDleePrmPtDCm4EZU",
  authDomain: "fir-ntp.firebaseapp.com",
  projectId: "fir-ntp",
  storageBucket: "fir-ntp.appspot.com",
  messagingSenderId: "242736510225",
  appId: "1:242736510225:web:da3ace0beb21adb76608b0",
  measurementId: "G-84YY36V127",
};
// firebase.initializeApp(firebase_config);
const firebase_app = !firebase.apps.length
  ? firebase.initializeApp(firebase_config)
  : firebase.app();

const db = firebase_app.firestore();
const auth = firebase_app.auth();
const google_provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, google_provider };
