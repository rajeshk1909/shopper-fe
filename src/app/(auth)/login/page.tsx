"use client"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { useToast } from "@/context/ToastProvider"
import api from "@/Utility/axiosInstance"
import { Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { RiLoader2Fill } from "react-icons/ri"

interface FormData {
  email: string
  password: string
}

interface Errors {
  email: string
  password: string
}

const Login = () => {
  const router = useRouter()
  const { showToast } = useToast()
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

    const newErrors: Errors = Object.keys(formData).reduce((acc, key) => {
      acc[key as keyof Errors] = ""
      return acc
    }, {} as Errors)

    if (!formData.email) newErrors.email = "Email is required"
    if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email address"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters"

    setErrors(newErrors)

    return Object.values(newErrors).every((error) => error === "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return
    setLoading(true)
    try {
      const response = await api.post("/api/user/login", {
        email: formData.email,
        password: formData.password,
      })

      if (response.status === 200) {
        router.push("/")
        localStorage.setItem("user", response.data)
        showToast("success", response.data.message)
      } else {
        showToast("info", response.data.message)
      }
    } catch (error: any) {
      if (error.response) {
        showToast("error", error.response.data.message)
      } else {
        showToast("error", "An unknown error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center py-12 px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex justify-center mb-4'>
          <Shield className='w-12 h-12 text-blue-600 animate-bounce' />
        </div>
        <h2 className='text-center text-3xl font-extrabold text-gray-900'>
          Sign in to your account
        </h2>
        <p className='mt-2 text-center gap-2 flex justify-center font-lexend font-medium text-sm text-gray-600'>
          Or
          <Link
            href='/register'
            className='font-medium text-blue-600 hover:text-blue-500'>
            create a new account
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <Input
              label='Email address'
              type='email'
              name='email'
              handleChange={handleChange}
              value={formData.email}
              error={!!errors.email}
              errorMessage={errors.email}
            />

            <Input
              label='Password'
              type='password'
              handleChange={handleChange}
              value={formData.password}
              error={!!errors.password}
              errorMessage={errors.password}
              name='password'
            />

            <Button
              type='submit'
              className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-105'>
              {loading ? (
                <span className='text-xl animate-spin'>
                  <RiLoader2Fill />
                </span>
              ) : (
                <p>Sign In</p>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
