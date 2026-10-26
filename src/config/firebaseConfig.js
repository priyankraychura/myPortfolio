// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
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

// Initialize Firebase. Only Analytics is used, so Auth and Firestore stay out of the bundle.
const app = initializeApp(firebaseConfig);

// browsers that block cookies or IndexedDB can't run Analytics; skip them instead of throwing
isSupported().then((supported) => supported && getAnalytics(app)).catch(() => {});
