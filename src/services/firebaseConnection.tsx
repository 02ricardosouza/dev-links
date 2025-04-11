
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBcwd1iJOOCDXE28cjonipUEoii5x9bF-Q",
  authDomain: "linktree-72e91.firebaseapp.com",
  projectId: "linktree-72e91",
  storageBucket: "linktree-72e91.firebasestorage.app",
  messagingSenderId: "1000905605550",
  appId: "1:1000905605550:web:9e57a776663adaf616883f",
  measurementId: "G-7EMD68JKHF"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };