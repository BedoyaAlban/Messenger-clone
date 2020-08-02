import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA-5RBxSe0HVmy22rrzqXAhln3Pbe3khh0",
  authDomain: "messenger-clone-843e6.firebaseapp.com",
  databaseURL: "https://messenger-clone-843e6.firebaseio.com",
  projectId: "messenger-clone-843e6",
  storageBucket: "messenger-clone-843e6.appspot.com",
  messagingSenderId: "189886466970",
  appId: "1:189886466970:web:adcad91f46d0979f2a8823",
  measurementId: "G-6SK84YVVNT"
});

const db = firebaseApp.firestore();

export default db;
