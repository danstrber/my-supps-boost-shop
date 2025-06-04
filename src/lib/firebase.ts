
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCF_Jv6TZ39WGfkzVaarkkRj1xvLQN8J44",
  authDomain: "mkbooster-f5f9b.firebaseapp.com",
  projectId: "mkbooster-f5f9b",
  storageBucket: "mkbooster-f5f9b.firebasestorage.app",
  messagingSenderId: "23097663705",
  appId: "1:23097663705:web:4f8a93ac28889e53f51ec8",
  measurementId: "G-Z6F0YXBTML"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
