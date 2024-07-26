// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmp6sPPgX5pc200A7LqUc2Nm5MurJbC3U",
  authDomain: "compte-test-1.firebaseapp.com",
  projectId: "compte-test-1",
  storageBucket: "compte-test-1",
  messagingSenderId: "413778579886",
  appId: "1:413778579886:web:ac79f8cf5440661215b83f",
  measurementId: "G-8CMRRN81PK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
export { db };
