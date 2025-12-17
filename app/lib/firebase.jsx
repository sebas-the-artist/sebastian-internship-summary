import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgenReLGF0YyKHJ7AJrdn_ThjIWCqjp18",
  authDomain: "summarist-internship-509d4.firebaseapp.com",
  projectId: "summarist-internship-509d4",
  storageBucket: "summarist-internship-509d4.firebasestorage.app",
  messagingSenderId: "577135586770",
  appId: "1:577135586770:web:5a3f431d97c7f5d4762c0b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
