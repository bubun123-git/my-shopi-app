import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app;

export const auth = getAuth(); // Initialize auth outside of the useEffect

// Client-side component to handle Firebase initialization
export default function FirebaseApp() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !getApps().length) {
      app = initializeApp(firebaseConfig);
    }
    setIsClient(true); // Set state to confirm it's running on the client side
  }, []);

  if (!isClient) return null; // Return nothing while on the server side

  return null;
}
