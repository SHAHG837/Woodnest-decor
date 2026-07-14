import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Read configuration
const firebaseConfig = {
  projectId: "dogwood-helix-kt3g1",
  appId: "1:312471054610:web:096a28e7834c787d41abcb",
  apiKey: "AIzaSyCquYLEvpLzuCCT-bF2pmWmxmzVcXNXLnI",
  authDomain: "dogwood-helix-kt3g1.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-3b3273df-9e7b-4aaa-89e8-41d937a0bdab",
  storageBucket: "dogwood-helix-kt3g1.firebasestorage.app",
  messagingSenderId: "312471054610"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
