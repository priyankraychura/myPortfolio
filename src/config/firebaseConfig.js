// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDuxuSeEu8l7HQAxxVDWbCZK-qWM64pTk",
  authDomain: "myportfolio-666ec.firebaseapp.com",
  projectId: "myportfolio-666ec",
  storageBucket: "myportfolio-666ec.firebasestorage.app",
  messagingSenderId: "108049232854",
  appId: "1:108049232854:web:65054648dc77bea07c2a77",
  measurementId: "G-9G4081W1W8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider }