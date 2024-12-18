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
    "inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary: "border-transparent text-white bg-blue-600 hover:bg-blue-700 ",
    secondary:
      "w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-105",
    outline: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 ",
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
