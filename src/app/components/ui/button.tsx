import type React from "react"
import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost"
  size?: "default" | "sm"
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}) => {
  const baseStyles = "font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
  const variantStyles = {
    default: "bg-primary text-white hover:bg-primary-dark",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
  }
  const sizeStyles = {
    default: "px-4 py-2",
    sm: "px-3 py-1 text-sm",
  }

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}

