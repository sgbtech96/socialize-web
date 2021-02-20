import firebase from "firebase/app";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyA49kv9XQ4v77ALhEM-UM3Uy9aTlxR9fqY",
  authDomain: "react-ccg.firebaseapp.com",
  databaseURL: "https://react-ccg.firebaseio.com",
  projectId: "react-ccg",
  storageBucket: "react-ccg.appspot.com",
  messagingSenderId: "498028786284",
  appId: "1:498028786284:web:e8c0e94b6ac3eab3391e49",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
