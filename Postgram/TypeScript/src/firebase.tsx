// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";

import {
  getAuth,
  initializeAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFR4Er_nAmHChJxyb_ZkWvH_4RHk0MXxU",
  authDomain: "postgram-45c3d.firebaseapp.com",
  projectId: "postgram-45c3d",
  storageBucket: "postgram-45c3d.firebasestorage.app",
  messagingSenderId: "798369454216",
  appId: "1:798369454216:web:67d31c4e3d9618c443a73d",
};


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

let app;
if (!getApps.length) {
  app = initializeApp(firebaseConfig); // if the app is not already initialized then initialize it.
} else {
  app = getApp(); //if the App is already present then use it.
}


// Initliaze auth
const auth = getAuth(app);
// Initialize Firrstore
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword,signOut };