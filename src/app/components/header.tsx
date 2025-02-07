"use client"

import Link from "next/link"
import { ShoppingCart, LogOut } from "lucide-react"
import { useState } from "react"
import { useAuth } from "../../../hooks/useAuth"
import { signOut } from "firebase/auth"
import { auth } from "../../../lib/firebase"
import { Button } from "../components/ui/button"

interface NavItem {
  label: string
  href: string
  active?: boolean
}

interface CartItem {
  id: number
  quantity: number
}

interface HeaderProps {
  cartItems: CartItem[]
  onCartClick: () => void
}

export default function Header({ cartItems, onCartClick }: HeaderProps) {
  const [navItems] = useState<NavItem[]>([
    { label: "All", href: "/all", active: true },
    { label: "Clothes", href: "/clothes" },
    { label: "Electronics", href: "/electronics" },
    { label: "Furnitures", href: "/furnitures" },
    { label: "Toys", href: "/toys" },
  ])

  const { user } = useAuth()
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Failed to log out", error)
    }
  }

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center flex-wrap">
            <Link href="/" className="text-xl font-semibold mr-8">
              Shopi
            </Link>
            <nav>
              <ul className="flex flex-wrap">
                {navItems.map((item) => (
                  <li key={item.href} className="mr-8">
                    <Link
                      href={item.href}
                      className={`text-sm hover:text-primary transition-colors whitespace-nowrap ${
                        item.active ? "border-b-2 border-primary text-primary font-medium" : "text-gray-600"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center space-x-6 flex-wrap">
            {user ? (
              <>
                <span className="text-sm text-gray-600 whitespace-nowrap">{user.email}</span>
                <Link
                  href="/orders"
                  className="text-sm text-gray-600 hover:text-primary transition-colors whitespace-nowrap"
                >
                  My Orders
                </Link>
                <Link
                  href="/account"
                  className="text-sm text-gray-600 hover:text-primary transition-colors whitespace-nowrap"
                >
                  My Account
                </Link>
                <Button onClick={handleLogout} variant="ghost" size="sm">
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-gray-600 hover:text-primary transition-colors whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-sm text-gray-600 hover:text-primary transition-colors whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </>
            )}
            <button onClick={onCartClick} className="flex items-center space-x-1 hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm">{cartItemCount}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

