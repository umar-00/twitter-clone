// import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGlBltNw6gkEUi5hMYrKS-1rcr8zrC78E",
  authDomain: "twitter-clone-react-js.firebaseapp.com",
  projectId: "twitter-clone-react-js",
  storageBucket: "twitter-clone-react-js.appspot.com",
  messagingSenderId: "552374382088",
  appId: "1:552374382088:web:2dc4160a92972eefab6bbd",
  measurementId: "G-9XPTY0ZY03",
};

// const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);

// const db = firebaseApp.firestore();
const db = getFirestore(firebaseApp);
// const auth = firebase.auth();
const auth = getAuth(firebaseApp);
// const provider = new firebase.auth.GoogleAuthProvider();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
