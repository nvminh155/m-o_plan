import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { env } from "./config/env";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "m-o-plans.firebaseapp.com",
  databaseURL: "https://m-o-plans-default-rtdb.firebaseio.com",
  projectId: "m-o-plans",
  storageBucket: "m-o-plans.firebasestorage.app",
  messagingSenderId: "771337698600",
  appId: env.EXPO_PUBLIC_FIREBASE_API_KEY
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {});
export const db = getFirestore(app);