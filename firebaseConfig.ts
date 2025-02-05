// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0DsGjmizVQizEiOUe4kMqpDCIx6IfmEU",
  authDomain: "m-o-plans.firebaseapp.com",
  projectId: "m-o-plans",
  storageBucket: "m-o-plans.firebasestorage.app",
  messagingSenderId: "771337698600",
  appId: "1:771337698600:web:9b26e280542bd9f443e41d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {});
export const db = getFirestore(app);


