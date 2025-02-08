import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

let app;

// Initialize Firebase only on the client-side
if (typeof window !== "undefined" && !getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0] || null; // Fallback if needed
}

export const auth = typeof window !== "undefined" && app ? getAuth(app) : null;

// Client-side component to handle initialization
export default function FirebaseApp() {
  useEffect(() => {
    if (typeof window !== "undefined" && !getApps().length) {
      initializeApp(firebaseConfig);
    }
  }, []);

  return null;
}