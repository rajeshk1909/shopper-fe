"use client"

import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface InputProps {
  label: string
  type: string
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  error?: boolean
  errorMessage?: string
  name?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  type,
  error,
  value,
  errorMessage,
  handleChange,
  name,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev)
  }

  const isPasswordField = type === "password"

  return (
    <div className='flex flex-col mb-1'>
      <label className='text-sm font-medium font-lexend text-gray-700'>
        {label}
      </label>
      <div className='relative'>
        <input
          name={name}
          onChange={handleChange}
          className={`block w-full rounded-lg px-4 py-2 text-sm bg-gray-50 border border-gray-300 focus:ring-blue-400 focus:outline-none focus:ring-2 transition-shadow duration-200 placeholder-gray-400 hover:shadow-md`}
          type={isPasswordField && isPasswordVisible ? "text" : type}
        />
        {isPasswordField && (
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700'
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}>
            {isPasswordVisible ? (
              <EyeOff className='w-5 h-5' />
            ) : (
              <Eye className='w-5 h-5' />
            )}
          </button>
        )}
        {error && <p className='text-sm text-red-500'>{errorMessage}</p>}
      </div>
    </div>
  )
}
