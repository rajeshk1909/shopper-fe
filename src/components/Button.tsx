import React from "react"
import { LuLoaderPinwheel } from "react-icons/lu"


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  variant?: "primary" | "secondary" | "outline"
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary:
      "border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "border-transparent text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500",
    outline:
      "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500",
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={loading}
      {...props}>
      {loading && <LuLoaderPinwheel className='w-4 h-4 mr-2 animate-spin' />}
      {children}
    </button>
  )
}
