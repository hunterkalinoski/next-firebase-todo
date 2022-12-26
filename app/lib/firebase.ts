// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0U3hyfY5WV8yNHcvD7RrwOasF0cAi_rg",
  authDomain: "next-firebase-todo-5d7c5.firebaseapp.com",
  projectId: "next-firebase-todo-5d7c5",
  storageBucket: "next-firebase-todo-5d7c5.appspot.com",
  messagingSenderId: "773293101229",
  appId: "1:773293101229:web:ee420fe0e91b57a92cb624",
  measurementId: "G-NY3K9EC0JW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
