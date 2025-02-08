import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const auth = typeof window !== "undefined" ? getAuth() : null;

// Initialize Firebase client-side only
export default function FirebaseApp() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize Firebase only in the browser
      if (!getApps().length) {
        initializeApp(firebaseConfig); // We no longer need to assign to `app`
      }
      setIsClient(true);
    }
  }, []);

  if (!isClient) {
    // On the server-side, return null
    return null;
  }

  return null;
}
