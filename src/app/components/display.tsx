"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, ChevronDown, Star } from "lucide-react"

interface Product {
  id: number
  title: string
  price: number
  description: string
  images: string[]
  category: {
    name: string
  }
}

interface DisplayProps {
  addToCart: (product: Product) => void
}

export default function Display({ addToCart }: DisplayProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isClient, setIsClient] = useState(false)
  const [sortBy, setSortBy] = useState("name")
  const [filterCategory, setFilterCategory] = useState("all")

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      fetch("https://api.escuelajs.co/api/v1/products")
        .then((response) => response.json())
        .then((data: Product[]) => setProducts(data))
        .catch((error) => console.error("Error fetching products:", error))
    }
  }, [isClient])

  const getImageUrl = (images: string[]): string => {
    if (!images || images.length === 0) return "/placeholder.svg"

    const firstImage = images[0]
    if (typeof firstImage === "string") {
      return firstImage.startsWith("http") ? firstImage : `/${firstImage}`
    }

    return "/placeholder.svg"
  }

  const filteredAndSortedProducts = products
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === "all" || product.category.name === filterCategory),
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title)
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      return 0
    })

  const categories = ["all", ...new Set(products.map((product) => product.category.name))]

  if (!isClient) {
    return <div>Loading...</div>
  }

  return (
    <div className="py-6 text-center">
      <div className="mb-4">
        <a href="/" className="text-gray-800 hover:text-primary transition-colors">
          Home
        </a>
      </div>
      <div className="max-w-md mx-auto px-4 mb-8 relative">
        <input
          type="text"
          placeholder="Search a product"
          className="w-full px-4 py-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:border-primary transition-colors h-16 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="flex justify-center space-x-4 mb-8">
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-primary"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-primary"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {filteredAndSortedProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 flex flex-col transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:z-10 bg-white"
          >
            <div className="relative w-full h-48 mb-4 overflow-hidden rounded">
              <Image
                src={getImageUrl(product.images) || "/placeholder.svg"}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-2 flex-grow">{product.description}</p>
            <div className="flex justify-between items-center mb-2">
              <p className="text-primary font-bold">${product.price}</p>
              <div className="flex items-center">
                <Star className="text-yellow-400 w-4 h-4 mr-1" />
                <span className="text-sm text-gray-600">{(Math.random() * (5 - 3) + 3).toFixed(1)}</span>
              </div>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

