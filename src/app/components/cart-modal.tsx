"use client"

import { X, Plus, Minus } from "lucide-react"
import Image from "next/image"

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  images: string[]
}

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
}

export default function CartModal({ isOpen, onClose, cartItems, removeFromCart, updateQuantity }: CartModalProps) {
  if (!isOpen) return null

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-6">My Order</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={item.images[0] || "/placeholder.svg"}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-lg font-semibold">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-gray-700">
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex justify-between items-center text-xl font-semibold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
            disabled={cartItems.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

