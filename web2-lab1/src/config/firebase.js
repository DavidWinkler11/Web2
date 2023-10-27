import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDu98HEglCIUBaeUxyaS4y0hCJRQFTgECQ",
  authDomain: "labos1-2a8fe.firebaseapp.com",
  projectId: "labos1-2a8fe",
  storageBucket: "labos1-2a8fe.appspot.com",
  messagingSenderId: "631789138943",
  appId: "1:631789138943:web:59fba30da0a2602c032dca",
  measurementId: "G-PT711N5FN4"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
