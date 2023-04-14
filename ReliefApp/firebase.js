import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7cc54lrevO7ObNjdDovzlSuPqlP-JJ-c",
  authDomain: "fir-dra-auth.firebaseapp.com",
  projectId: "fir-dra-auth",
  storageBucket: "fir-dra-auth.appspot.com",
  messagingSenderId: "635422660749",
  appId: "1:635422660749:web:6bc19b61290b9250e8aac4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // This line was missing

// Export the Firebase services for use in your app
export { app, db, auth };
