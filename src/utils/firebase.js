import firebase from "firebase/app";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyCMDYZ9qzgS7g6LxXhoOhqDa7jtT6l6dck",
  authDomain: "shhh-4babe.firebaseapp.com",
  projectId: "shhh-4babe",
  storageBucket: "shhh-4babe.appspot.com",
  messagingSenderId: "246575816707",
  appId: "1:246575816707:web:e7c2cc6850b2b1e3136e36"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
