// Import the necessary functions from Firebase SDK

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPmqftyiVIvTj_hqCSYkeGrXNwoICiWGU",
  authDomain: "bloodconnect-bc36c.firebaseapp.com",
  projectId: "bloodconnect-bc36c",
  storageBucket: "bloodconnect-bc36c.firebasestorage.app",
  messagingSenderId: "616609097283",
  appId: "1:616609097283:web:52e5f3435b9e57d6dd16f6",
  measurementId: "G-WPRXZJQ2DL",
};

// Initialize Firebase app
const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firebase Auth (No need for custom persistence)
const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// Initialize Firestore
const FIREBASE_DB = getFirestore(FIREBASE_APP);

// Export Firebase modules
export {
  FIREBASE_APP,
  FIREBASE_AUTH,
  FIREBASE_DB,
  createUserWithEmailAndPassword,
};
