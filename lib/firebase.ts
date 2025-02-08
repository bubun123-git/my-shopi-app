import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app;

export const auth = getAuth();

// Initialize Firebase only if it is not already initialized
export default function FirebaseApp() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !getApps().length) {
      // Initialize Firebase only on the client-side
      app = initializeApp(firebaseConfig);
    }
    setIsClient(true); // Set state to indicate client-side
  }, []);

  if (!isClient) return null; // Prevent rendering during SSR

  return null;
}
