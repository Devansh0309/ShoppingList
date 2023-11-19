// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZj9IyWvanrztAhthK3HBrGML-QFE1nEE",
  authDomain: "shoppinglist2-50a92.firebaseapp.com",
  projectId: "shoppinglist2-50a92",
  storageBucket: "shoppinglist2-50a92.appspot.com",
  messagingSenderId: "858230661178",
  appId: "1:858230661178:web:759d006f55c0479aea1503"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export  {auth,signInWithPopup,GoogleAuthProvider,db}
// export const firestore = firebase.firestore();