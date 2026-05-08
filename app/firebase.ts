import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuFHr9UmDz_tdQKjwr1sJ5QIydp-rRBpk",
  authDomain: "payzento-chat.firebaseapp.com",
  projectId: "payzento-chat",
  storageBucket: "payzento-chat.firebasestorage.app",
  messagingSenderId: "59539402711",
  appId: "1:59539402711:web:7e94a99c6a6543dbe2a592",
  measurementId: "G-FN6DT6D79S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);