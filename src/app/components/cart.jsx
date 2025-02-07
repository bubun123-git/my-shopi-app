"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function Cart({ isOpen, onClose, cartItems, removeFromCart }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div
      className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <p className="mr-2">${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t">
              <p className="font-semibold">Total: ${total.toFixed(2)}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

