// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKGwg94IEeh9EJwyUnuFWR_IM9TCxViUk",
  authDomain: "e-votie-chat.firebaseapp.com",
  projectId: "e-votie-chat",
  storageBucket: "e-votie-chat.appspot.com",
  messagingSenderId: "421016081813",
  appId: "1:421016081813:web:f0df047d7c47ffe224529c",
  measurementId: "G-6H7NKWZR5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);