import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// User provided production config
const firebaseConfig = {
  apiKey: "AIzaSyCtuE-kRtKdMoCe7MYMmx-4ToOyoxtgxcA",
  authDomain: "book-loop-2bb68.firebaseapp.com",
  projectId: "book-loop-2bb68",
  storageBucket: "book-loop-2bb68.firebasestorage.app",
  messagingSenderId: "88441838765",
  appId: "1:88441838765:web:1afab410fce8e96676fa24",
  measurementId: "G-DRXMMZF785"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const APP_ID = "book-loop-001";
