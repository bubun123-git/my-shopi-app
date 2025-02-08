"use client"

import { useState, useEffect } from "react"
import { type User, onAuthStateChanged, Auth } from "firebase/auth"
import { auth } from "../lib/firebase"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Ensure auth is not null before using it
    if (auth) {
      const unsubscribe = onAuthStateChanged(
        auth as Auth, // Type assertion to ensure auth is always Auth here
        (user) => {
          setUser(user)
          setLoading(false)
        },
        (error) => {
          console.error("Auth error:", error)
          setError(error.message)
          setLoading(false)
        },
      )

      return () => unsubscribe()
    } else {
      setError("Firebase auth is not initialized")
      setLoading(false)
    }
  }, [])

  return { user, loading, error }
}
