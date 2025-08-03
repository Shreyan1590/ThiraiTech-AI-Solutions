// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs4ZZvnf0wYINTmRbPT2L4L31qFnSU6qU",
  authDomain: "devnest-ai-91d5f.firebaseapp.com",
  projectId: "devnest-ai-91d5f",
  storageBucket: "devnest-ai-91d5f.appspot.com",
  messagingSenderId: "419210676050",
  appId: "1:419210676050:web:70aa11deab5024c0865c8b",
  measurementId: "G-1N9C253DTK"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);


export { app, auth, db };
